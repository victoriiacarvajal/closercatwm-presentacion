$file = "c:\Users\roger\Downloads\closercat-presentation\components\shared\ConversationSimulator.tsx"
$newPrintView = Get-Content "c:\Users\roger\Downloads\closercat-presentation\new_renderPrintView.txt" -Raw
$newPayload = Get-Content "c:\Users\roger\Downloads\closercat-presentation\new_payload_part.txt" -Raw
$content = Get-Content $file -Raw

# 1. Replace renderPrintView
# Regex to match the entire function block starting with the comment
$patternPrintView = "(?s)// Vista de impresión dedicada.*?const renderPrintView = \(\) => \{.*?\n  \};"
# Note: The ending brace logic is tricky with regex. 
# Alternatively, I can find the start and assume it goes until "return (" of the main component?
# No, that's risky.
# Let's try to match specifically what we know is there.
# The original renderPrintView ends with "  };" before the main return.
# Let's try a safer replacement: replacing the start and letting it consume until it sees the main return, but that's also risky.
# Let's use the known content of the OLD renderPrintView if possible.
# But I don't have it in a file.
# Okay, I will use a precise regex that matches the start and looks for the characteristic end of that function.
# The old function returns a div with hidden print:block.
$patternPrintView = "(?s)\s+// Vista de impresión dedicada.*?const renderPrintView = \(\) => \{.*?return \(\s+<div className=""hidden print:block"".*?\);\s+\};"
$content = $content -replace $patternPrintView, "`r`n$newPrintView"

# 2. Replace Payload
$patternPayload = "(?s)lead: formData,\s+simulation: \{\s+conversation,\s+multimediaStats,\s+projection,\s+\},"
$content = $content -replace $patternPayload, $newPayload

$content | Set-Content $file -NoNewline

Write-Host "ConversationSimulator.tsx updated successfully (Part 3)!"
