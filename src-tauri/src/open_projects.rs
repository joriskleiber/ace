use log::info;
use tauri::async_runtime::Mutex;
use ts_rs::TS;

#[derive(TS)]
#[ts(export)]
pub struct OpenProjectsStore(pub Mutex<Vec<String>>);

#[tauri::command]
pub async fn close_project(
    location: String,
    projects_state: tauri::State<'_, OpenProjectsStore>,
) -> Result<Vec<String>, ()> {
    info!("Closing project: {}", location);

    let mut projects = projects_state.0.lock().await;
    projects.retain(|project| project != &location);

    Ok(projects.clone())
}
