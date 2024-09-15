mod commands;

use commands::projects;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let tauri_specta_builder =
        tauri_specta::Builder::<tauri::Wry>::new().commands(tauri_specta::collect_commands![
            projects::open_project,
            projects::close_project,
            projects::create_project,
        ]);

    #[cfg(debug_assertions)]
    tauri_specta_builder
        .export(
            specta_typescript::Typescript::default(),
            "../src/backend/bindings.ts",
        )
        .expect("Failed to export typescript bindings");

    tauri::Builder::default()
        .invoke_handler(tauri_specta_builder.invoke_handler())
        .setup(move |app| {
            tauri_specta_builder.mount_events(app);

            Ok(())
        })
        // on an actual app, remove the string argument
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
