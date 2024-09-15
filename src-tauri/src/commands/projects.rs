#[tauri::command]
#[specta::specta]
pub fn open_project(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
#[specta::specta]
pub fn close_project(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
#[specta::specta]
pub fn create_project(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
