// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod open_projects;

use std::{collections::HashMap, fs};

use log::error;
use open_projects::{close_project, OpenProjectsStore};
use serde_json::json;
use tauri::Manager;
use tauri_plugin_log::LogTarget;
use tauri_plugin_store::StoreBuilder;

struct StoreState();
// struct StoreState(Mutex<Store<Wry>>);

// impl StoreState {
//     fn get(&self, key: &str) -> Option<serde_json::Value> {
//         self.0.lock().unwrap().get(key).cloned()
//     }

//     fn insert(&self, key: String, value: serde_json::Value) -> Result<(), Error> {
//         self.0.lock().unwrap().insert(key, value)
//     }
// }

fn main() {
    tauri::Builder::default()
        .manage(OpenProjectsStore)
        .invoke_handler(tauri::generate_handler![close_project])
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout])
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            let store_location = app
                .path_resolver()
                .app_config_dir()
                .expect("failed to resolve app config directory");

            fs::create_dir_all(&store_location).expect("failed to create store directory");

            let mut store_defaults = HashMap::new();
            store_defaults.insert("discord_integration".to_string(), json!(false));
            store_defaults.insert("recently_opened".to_string(), json!([]));

            let mut store = StoreBuilder::new(app.app_handle(), store_location.join("config"))
                .defaults(store_defaults)
                .build();

            if let Err(load_error) = store.load() {
                error!("Failed to load store: {:?}", load_error.to_string());
                store.save().expect("failed to save store");
            }

            app.manage(StoreState());
            // app.manage(StoreState(Mutex::new(store)));

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
