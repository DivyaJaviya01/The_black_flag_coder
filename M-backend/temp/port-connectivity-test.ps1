# Port Connectivity Test Suite (PowerShell Version)
# Tests connectivity for all ports used in the M-frontend and M-backend application

param(
    [string]$TargetHost = "localhost",
    [int]$Timeout = 5000,
    [switch]$SaveJson,
    [switch]$Help
)

# Configuration
$Config = @{
    Frontend = @{
        Dev = 5173
        Preview = 4173
    }
    Backend = @(3000, 3001, 3002, 5174, 8000, 5000, 3003, 8001, 5173, 4000, 8080)
    Database = @{
        MongoDB = 27017
        MongoExpress = 8081
    }
    Host = $TargetHost
    Timeout = $Timeout
}

# Results storage
$TestResults = @{
    Passed = @()
    Failed = @()
    Warnings = @()
    Summary = @{}
}

function Show-Usage {
    Write-Host @"
Port Connectivity Test Suite (PowerShell)

Usage: .\port-connectivity-test.ps1 [options]

Parameters:
  -TargetHost HOST  Set target host (default: localhost)
  -Timeout MS       Set timeout in milliseconds (default: 5000)
  -SaveJson         Save results to JSON file
  -Help             Show this help message

Tests performed:
  • TCP connectivity to all configured ports
  • HTTP connectivity for web servers
  • Port conflict detection

Ports tested:
  • Frontend: $($Config.Frontend.Dev) (Vite dev server)
  • Backend: $($Config.Backend -join ', ')
  • Database: $($Config.Database.MongoDB) (MongoDB), $($Config.Database.MongoExpress) (Mongo Express)
"@
}

function Test-PortConnectivity {
    param(
        [string]$HostName,
        [int]$Port,
        [int]$TimeoutMs = 3000
    )
    
    try {
        $tcpClient = New-Object System.Net.Sockets.TcpClient
        $connection = $tcpClient.BeginConnect($HostName, $Port, $null, $null)
        $wait = $connection.AsyncWaitHandle.WaitOne($TimeoutMs, $false)
        
        if ($wait) {
            $tcpClient.EndConnect($connection)
            $tcpClient.Close()
            return @{
                Success = $true
                Port = $Port
                Message = "Port is listening"
            }
        } else {
            $tcpClient.Close()
            return @{
                Success = $false
                Port = $Port
                Message = "Connection timeout"
            }
        }
    } catch {
        return @{
            Success = $false
            Port = $Port
            Message = $_.Exception.Message
        }
    }
}

function Test-HttpConnectivity {
    param(
        [string]$HostName,
        [int]$Port,
        [int]$TimeoutMs = 5000
    )
    
    try {
        $url = "http://${HostName}:${Port}/"
        $request = [System.Net.WebRequest]::Create($url)
        $request.Timeout = $TimeoutMs
        
        $response = $request.GetResponse()
        $statusCode = [int]$response.StatusCode
        $response.Close()
        
        return @{
            Success = $true
            Port = $Port
            StatusCode = $statusCode
            Message = "HTTP $statusCode - OK"
        }
    } catch {
        return @{
            Success = $false
            Port = $Port
            Message = "HTTP error: $($_.Exception.Message)"
        }
    }
}

function Write-TestResult {
    param(
        [hashtable]$Result,
        [string]$TestType
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
    $status = if ($Result.Success) { "PASS" } else { "FAIL" }
    $color = if ($Result.Success) { "Green" } else { "Red" }
    
    Write-Host "$status [$TestType] Port $($Result.Port): $($Result.Message)" -ForegroundColor $color
    
    if ($Result.StatusCode) {
        Write-Host "     HTTP $($Result.StatusCode)" -ForegroundColor Cyan
    }
    
    # Store result
    $resultWithMeta = $Result.Clone()
    $resultWithMeta.TestType = $TestType
    $resultWithMeta.Timestamp = $timestamp
    
    if ($Result.Success) {
        $TestResults.Passed += $resultWithMeta
    } else {
        $TestResults.Failed += $resultWithMeta
    }
}

function Test-AllPorts {
    Write-Host "Starting Port Connectivity Tests" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Host: $($Config.Host)" -ForegroundColor Cyan
    Write-Host "Timeout: $($Config.Timeout)ms" -ForegroundColor Cyan
    Write-Host ""
    
    # Test Frontend Ports
    Write-Host "Testing Frontend Ports" -ForegroundColor Yellow
    
    $frontendResult = Test-PortConnectivity -HostName $Config.Host -Port $Config.Frontend.Dev -TimeoutMs $Config.Timeout
    Write-TestResult -Result $frontendResult -TestType "Frontend-TCP"
    
    if ($frontendResult.Success) {
        $httpResult = Test-HttpConnectivity -HostName $Config.Host -Port $Config.Frontend.Dev -TimeoutMs $Config.Timeout
        Write-TestResult -Result $httpResult -TestType "Frontend-HTTP"
    }
    
    Write-Host ""
    
    # Test Backend Ports
    Write-Host "Testing Backend Ports" -ForegroundColor Yellow
    
    foreach ($port in $Config.Backend) {
        $tcpResult = Test-PortConnectivity -HostName $Config.Host -Port $port -TimeoutMs $Config.Timeout
        Write-TestResult -Result $tcpResult -TestType "Backend-TCP"
        
        if ($tcpResult.Success) {
            $httpResult = Test-HttpConnectivity -HostName $Config.Host -Port $port -TimeoutMs $Config.Timeout
            Write-TestResult -Result $httpResult -TestType "Backend-HTTP"
        }
        
        Start-Sleep -Milliseconds 100
    }
    
    Write-Host ""
    
    # Test Database Ports
    Write-Host "Testing Database Ports" -ForegroundColor Yellow
    
    $mongoResult = Test-PortConnectivity -HostName $Config.Host -Port $Config.Database.MongoDB -TimeoutMs $Config.Timeout
    Write-TestResult -Result $mongoResult -TestType "Database-MongoDB"
    
    $mongoExpressResult = Test-PortConnectivity -HostName $Config.Host -Port $Config.Database.MongoExpress -TimeoutMs $Config.Timeout
    Write-TestResult -Result $mongoExpressResult -TestType "Database-MongoExpress"
    
    Write-Host ""
}

function Test-PortConflicts {
    Write-Host "Checking for Port Conflicts" -ForegroundColor Yellow
    
    $allPorts = @($Config.Frontend.Dev, $Config.Frontend.Preview) + $Config.Backend + @($Config.Database.MongoDB, $Config.Database.MongoExpress)
    $portCounts = @{}
    $conflicts = @()
    
    foreach ($port in $allPorts) {
        if ($portCounts.ContainsKey($port)) {
            $portCounts[$port]++
        } else {
            $portCounts[$port] = 1
        }
        
        if ($portCounts[$port] -gt 1 -and $conflicts -notcontains $port) {
            $conflicts += $port
        }
    }
    
    if ($conflicts.Count -gt 0) {
        foreach ($port in $conflicts) {
            Write-Host "CONFLICT Port $port is configured multiple times" -ForegroundColor Red
            $TestResults.Warnings += @{
                Type = "conflict"
                Port = $port
                Message = "Port $port has multiple configurations"
            }
        }
    } else {
        Write-Host "No port conflicts detected" -ForegroundColor Green
    }
    
    Write-Host ""
}

function Show-Summary {
    $total = $TestResults.Passed.Count + $TestResults.Failed.Count
    $passRate = if ($total -gt 0) { [math]::Round(($TestResults.Passed.Count / $total) * 100, 1) } else { 0 }
    
    $TestResults.Summary = @{
        Total = $total
        Passed = $TestResults.Passed.Count
        Failed = $TestResults.Failed.Count
        Warnings = $TestResults.Warnings.Count
        PassRate = "$passRate%"
        Timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
    }
    
    Write-Host "Test Summary" -ForegroundColor Blue
    Write-Host "Total Tests: $total" -ForegroundColor Cyan
    Write-Host "Passed: $($TestResults.Passed.Count)" -ForegroundColor Green
    Write-Host "Failed: $($TestResults.Failed.Count)" -ForegroundColor Red
    Write-Host "Warnings: $($TestResults.Warnings.Count)" -ForegroundColor Yellow
    Write-Host "Pass Rate: $passRate%" -ForegroundColor White
    
    if ($TestResults.Failed.Count -gt 0) {
        Write-Host ""
        Write-Host "Failed Tests:" -ForegroundColor Red
        foreach ($result in $TestResults.Failed) {
            Write-Host "   • Port $($result.Port) ($($result.TestType)): $($result.Message)" -ForegroundColor Red
        }
    }
    
    if ($TestResults.Warnings.Count -gt 0) {
        Write-Host ""
        Write-Host "Warnings:" -ForegroundColor Yellow
        foreach ($warning in $TestResults.Warnings) {
            Write-Host "   • $($warning.Message)" -ForegroundColor Yellow
        }
    }
}

function Save-Results {
    $timestamp = Get-Date -Format "yyyy-MM-ddTHH-mm-ss"
    $filename = "port-test-results-$timestamp.json"
    
    try {
        $TestResults | ConvertTo-Json -Depth 10 | Out-File -FilePath $filename -Encoding UTF8
        Write-Host ""
        Write-Host "Results saved to: $filename" -ForegroundColor Cyan
    } catch {
        Write-Host ""
        Write-Host "Failed to save results: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Main execution
if ($Help) {
    Show-Usage
    exit 0
}

try {
    Write-Host "Port Connectivity Test Suite (PowerShell)" -ForegroundColor Cyan
    Write-Host "Testing connectivity for M-frontend and M-backend application" -ForegroundColor Cyan
    Write-Host ""
    
    Test-AllPorts
    Test-PortConflicts
    Show-Summary
    
    if ($SaveJson) {
        Save-Results
    }
    
    Write-Host ""
    Write-Host "Port connectivity tests completed!" -ForegroundColor Green
    
    # Exit with error code if any tests failed
    if ($TestResults.Failed.Count -gt 0) {
        exit 1
    } else {
        exit 0
    }
    
} catch {
    Write-Host "Test suite error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}