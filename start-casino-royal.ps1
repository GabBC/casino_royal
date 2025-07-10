# start-casino-royal.ps1

# Path to the backend folder
$backendPath = "D:\Gamer\Documents\Jobs\Casino_royal\casino_royal\backend"

# Path to the frontend folder
$frontendPath = "D:\Gamer\Documents\Jobs\Casino_royal\casino_royal\frontend"

<#
.DESCRIPTION
    Logs a message with optional formatting based on the type:
    - 'success': Green text on black background
    - 'error'  : Red text on black background
    - 'info'   : Cyan text with no background
.PARAMETER type
    The type of message to control formatting.
    Accepts 'success', 'error', or 'info'.
.PARAMETER message
    The message to display.
.EXAMPLE
    Write-LogMessage 'success' "Server started successfully."
.NOTES
    @author Gabriel Benniks
    @created 2025-07-08
    @lastModified 2025-07-08
#>
function Write-LogMessage($type, $message) {

    if ($type -eq 'success') {
        Write-Host $message -ForegroundColor Green -BackgroundColor Black
    }
    elseif ($type -eq 'error') {
        Write-Host $message -ForegroundColor Red -BackgroundColor Black
    }
    elseif ($type -eq 'info') {
        Write-Host $message -ForegroundColor Cyan
    }
    else {
        Write-Host $message
    }
    
}

<#
.DESCRIPTION
    Starts the Spring Boot backend by navigating to the backend directory
    and running the Maven wrapper script in a new PowerShell window.
.PARAMETER None
.EXAMPLE
    Start-Backend
.NOTES
    @author Gabriel Benniks
    @created 2025-07-08
    @lastModified 2025-07-08
#>
function Start-Backend {

    Write-LogMessage 'info' "Starting backend...`n"
    try {
        $proc = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$backendPath`"; ./mvnw spring-boot:run" -PassThru -ErrorAction Stop
        Write-LogMessage 'success' "Backend started successfully (PID $($proc.Id))"
    }
    catch {
        Write-LogMessage 'error' "Failed to start backend: $($_.Exception.Message)"
        exit 1
    }

}

<#
.DESCRIPTION
    Starts the Angular frontend by navigating to the frontend directory
    and running `npm start` in a new PowerShell window.
.PARAMETER None
.EXAMPLE
    Start-Frontend
.NOTES
    @author Gabriel Benniks
    @created 2025-07-08
    @lastModified 2025-07-08
#>
function Start-Frontend {

    Write-LogMessage 'info' "Starting frontend...`n"
    try {
        $proc = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$frontendPath`"; npm start" -PassThru -ErrorAction Stop
        Write-LogMessage 'success' "Frontend started successfully (PID $($proc.Id))"
    }
    catch {
        Write-LogMessage 'error' "Failed to start frontend: $($_.Exception.Message)"
        exit 1
    }

}

# Start backend and frontend
Start-Backend
Start-Sleep -Seconds 5
Start-Frontend

Write-LogMessage 'success' "`nBoth backend and frontend are (hopefully) running."