$file = "c:\Users\roger\Downloads\closercat-presentation\components\shared\ConversationSimulator.tsx"
$content = Get-Content $file -Raw

# 1. Add TeamStructureData import
$content = $content -replace "import { clarityEvent, getUtmParams } from '../../utils/tracking';", "import { clarityEvent, getUtmParams } from '../../utils/tracking';`r`nimport { TeamStructureData } from '../../types';"

# 2. Add new fields to ProjectionData interface
$oldInterface = @"
interface ProjectionData {
  conversationsPerMonth: number;
  avgTurnsPerConversation: number;
  textMessages: number;
  audioMessages: number;
  imageMessages: number;
  documentMessages: number;
  totalMessages: number;
  pessimisticCost: number;
  optimisticCost: number;
  expectedCost: number;
}
"@

$newInterface = @"
interface ProjectionData {
  conversationsPerMonth: number;
  avgTurnsPerConversation: number;
  textMessages: number;
  audioMessages: number;
  imageMessages: number;
  documentMessages: number;
  totalMessages: number;
  baseCost: number;
  teamMultiplier: number;
  adjustedBaseCost: number;
  integrationMonthlyCost: number;
  integrationSetupAmortized: number;
  totalIntegrationCost: number;
  servicesCost: number;
  servicesSetupAmortized: number;
  totalServicesCost: number;
  volumeDiscount: number;
  volumeDiscountApplied: boolean;
  totalMonthlyCost: number;
  pessimisticCost: number;
  optimisticCost: number;
  expectedCost: number;
}
"@

$content = $content -replace [regex]::Escape($oldInterface), $newInterface

# 3. Add new constants after COSTS
$costsEnd = "const COSTS = {`r`n  text: 180,`r`n  audio: 256,`r`n  image: 247,`r`n  document: 180, // Similar a texto`r`n  campaign: 66`r`n};"

$newConstants = @"
const COSTS = {
  text: 180,
  audio: 256,
  image: 247,
  document: 180,
  campaign: 66
};

const TEAM_MULTIPLIERS: Record<string, number> = {
  '1-5': 0.00,
  '6-10': 0.10,
  '11-20': 0.20,
  '21-50': 0.30,
  '50+': 0.50
};

const INTEGRATION_COSTS: Record<string, { monthly: number; setup: number }> = {
  crm_custom: { monthly: 500000, setup: 3500000 },
  erp_custom: { monthly: 800000, setup: 3500000 },
  custom_webhooks: { monthly: 300000, setup: 2000000 }
};

const SERVICES_COSTS = {
  campaign_msg: 66,
  custom_reports: 200000,
  migration_assisted: 800000,
  additional_line: 100000,
  onboarding: 600000
};
"@

$content = $content -replace [regex]::Escape($costsEnd), $newConstants

# 4. Update step type
$content = $content -replace "const \[step, setStep\] = useState<'simulator' \| 'multimedia' \| 'volume' \| 'form' \| 'results'>", "const [step, setStep] = useState<'simulator' | 'multimedia' | 'volume' | 'teamStructure' | 'form' | 'results'>"

# Save the file
$content | Set-Content $file -NoNewline

Write-Host "ConversationSimulator.tsx updated successfully!"
