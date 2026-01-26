$file = "c:\Users\roger\Downloads\closercat-presentation\components\shared\ConversationSimulator.tsx"
$newCalc = Get-Content "c:\Users\roger\Downloads\closercat-presentation\new_calculateProjection.txt" -Raw
$uiParts = Get-Content "c:\Users\roger\Downloads\closercat-presentation\ui_parts.txt" -Raw
$content = Get-Content $file -Raw

# 1. Replace calculateProjection
# We use a regex to find the old function block. It starts with "const calculateProjection" and ends before "const handleContinueToForm"
$pattern = "(?s)const calculateProjection = \(monthlyConversations: number\) => \{.*?\};"
$content = $content -replace $pattern, $newCalc

# 2. Insert UI parts and handlers before renderForm
$content = $content -replace "const renderForm = \(\) => \(", "$uiParts`r`n`r`n  const renderForm = () => ("

# 3. Update renderVolume button
$content = $content -replace "onClick=\{handleContinueToForm\}", "onClick={handleContinueToTeamStructure}"
$content = $content -replace "Ver proyección", "Continuar"

# 4. Update return statement to include renderTeamStructure
$content = $content -replace "\{step === 'form' && renderForm\(\)\}", "{step === 'teamStructure' && renderTeamStructure()}`r`n      {step === 'form' && renderForm()}"

# 5. Remove the old handleContinueToForm if it wasn't replaced by step 2 (it might be duplicated now if I'm not careful)
# Actually, step 2 inserted the NEW handleContinueToForm inside uiParts.
# But the OLD handleContinueToForm is still there right after calculateProjection (or where it was).
# Wait, my regex for calculateProjection ended at "};", so handleContinueToForm is still there.
# I need to remove the OLD handleContinueToForm.
# Let's find it and remove it. It starts with "const handleContinueToForm =" and ends before "const handleSubmitForm".
$patternOldHandler = "(?s)const handleContinueToForm = \(\) => \{.*?\};"
# Be careful not to remove the NEW one we just inserted.
# The new one is inside uiParts which we inserted BEFORE renderForm.
# The old one is likely BEFORE renderForm too, but AFTER the calculateProjection.
# Let's do this: finding the old handler specifically by its content "if (conversationsPerMonth < 10)" which the new one doesn't have (the new one just calls calc).
# Actually uiParts has `handleContinueToTeamStructure` which has that check.
# The `handleContinueToForm` in uiParts does NOT have that check.
# The OLD `handleContinueToForm` HAS that check.
$patternOldHandlerWithCheck = "(?s)const handleContinueToForm = \(\) => \{\s*if \(conversationsPerMonth < 10\).*?\};"
$content = $content -replace $patternOldHandlerWithCheck, ""

$content | Set-Content $file -NoNewline

Write-Host "ConversationSimulator.tsx updated successfully (Part 2)!"
