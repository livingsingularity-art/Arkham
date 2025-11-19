# Arkham Fate Engine - Hybrid Edition v2.0

A comprehensive AI Dungeon scripting system for dynamic narrative pacing, health/sanity tracking, and Lovecraftian horror storytelling.

---

## 🎯 Features

### Core Systems

- **📊 Dynamic Temperature System** - Adaptive story pacing from peaceful introduction through climactic conflicts
- **❤️ HP (Health Points)** - Track physical health with difficulty penalties and whip-poor-will stalking
- **🧠 SP (Sanity Points)** - Track mental stability with hallucinations and delusions at critical levels
- **🛡️ Grace Period** - Configurable safe zone preventing horror content for new stories
- **📍 Location Tracking** - Automatic detection with lore integration (optional)
- **🎭 Genre/Theme/Style Detection** - Dynamic narrative analysis for Lovecraftian horror
- **🦴 Bonepoke System** - Advanced narrative archetypes (lift/drop/shear/invert)
- **💬 User Note Preservation** - Keeps your custom author's notes intact
- **🎮 Player Commands** - Manual control over all systems

---

## 🚀 Quick Start

### Installation

1. **In AI Dungeon Scenario Editor:**
   - Copy `library.js` → Paste as **Input Modifier** (position 1)
   - Copy `hybrid-arkham-engine.js` → Paste as **Input Modifier** (position 2)

2. **Enable Memory Bank:**
   - Go to scenario settings
   - Enable "Memory Bank" feature (required for story cards)

3. **Start Your Story:**
   - The script initializes automatically on first turn
   - Grace period activates by default (10 turns of safe exploration)

---

## ⚙️ Configuration Guide

### Temperature System

```javascript
state.initialTemperatureValue = 1        // Starting tension level (1-15)
state.maximumTemperature = 12            // Climax threshold (recommended: 10-12)
state.temperatureIncreaseChance = 15     // Speed of escalation (lower = faster)

state.playerIncreaseHeatImpact = 2       // How much player actions increase heat
state.playerIncreaseTemperatureImpact = 1 // Direct temperature impact from player
```

**Recommendations:**
- **Slow burn:** `temperatureIncreaseChance = 20`, `maximumTemperature = 10`
- **Fast-paced:** `temperatureIncreaseChance = 10`, `maximumTemperature = 15`
- **Relaxed:** `maximumTemperature = 8`, `cooldownTimer = 8`

### HP System

```javascript
state.enableHPSystem = true              // Toggle HP tracking
state.initialHP = 100                    // Starting health
state.maximumHP = 100                    // Maximum health

state.hpCriticalThreshold = 25           // Below this: severe penalties + whip-poor-will
state.hpLowThreshold = 50                // Below this: moderate penalties
state.hpInjuredThreshold = 75            // Below this: minor penalties

state.playerInjuryImpact = 10            // Damage per injury word (player)
state.playerHealingImpact = 5            // Healing per healing word (player)
```

**HP Thresholds:**
- **100-76:** Full capacity
- **75-51:** *Injured* - Physical capabilities somewhat reduced
- **50-26:** *Low* - Physical activities difficult, movement labored
- **25-0:** *Critical* - Physical actions severely compromised, whip-poor-will stalks you

**Recommendations:**
- **Hardcore:** `playerInjuryImpact = 15`, `hpCriticalThreshold = 40`
- **Forgiving:** `playerInjuryImpact = 5`, `playerHealingImpact = 10`
- **Survival horror:** `hpCriticalThreshold = 50`, enable whip-poor-will

### SP System

```javascript
state.enableSPSystem = true              // Toggle sanity tracking
state.initialSP = 100                    // Starting sanity
state.maximumSP = 100                    // Maximum sanity

state.spCriticalThreshold = 25           // Below this: hallucinations + delusions
state.spUnstableThreshold = 50           // Below this: reality feels thin
state.spShakenThreshold = 75             // Below this: nerves frayed

state.playerSanityLossImpact = 8         // Sanity loss per dread word (player)
state.playerSanityGainImpact = 5         // Sanity gain per rationality word (player)

state.hallucinationChance = 15           // % chance per turn (when SP critical)
state.delusionChance = 10                // % chance per turn (when SP critical)
```

**SP Thresholds:**
- **100-76:** Fully lucid
- **75-51:** *Shaken* - Nerves frayed, unease pervasive
- **50-26:** *Unstable* - Reality feels thin, concentration difficult
- **25-0:** *Critical* - Reality fragmenting, hallucinations/delusions frequent

**Recommendations:**
- **Psychological horror:** `playerSanityLossImpact = 12`, `hallucinationChance = 25`
- **Cosmic horror:** `spCriticalThreshold = 40`, `delusionChance = 20`
- **Stable:** `playerSanityLossImpact = 5`, `hallucinationChance = 5`

### Whip-poor-will Mechanic

```javascript
state.enableWhippoorwill = true                    // Toggle the stalking bird
state.whippoorwillActivationThreshold = 25         // % chance when HP critical
state.whippoorwillIntensityMultiplier = 1          // Frequency multiplier
```

**What it does:**
- When HP drops below critical threshold, a whip-poor-will begins stalking the player
- The bird's distinctive call appears in the narrative: *"whip-poor-will, whip-poor-will"*
- In folklore, whip-poor-wills are harbingers of death
- Increases tension and atmospheric dread when physically vulnerable

**Recommendations:**
- **Frequent appearances:** `whippoorwillActivationThreshold = 40`
- **Rare but impactful:** `whippoorwillActivationThreshold = 15`
- **Disable:** `state.enableWhippoorwill = false`

### Grace Period

```javascript
state.enableGracePeriod = true                     // Toggle grace period
state.gracePeriodDuration = 10                     // Number of turns
state.gracePeriodMaxTemperature = 3                // Maximum temperature during grace

state.gracePeriodPreventsDread = true              // Blocks sanity loss
state.gracePeriodPreventsInjury = true             // Blocks HP loss
state.gracePeriodPreventsSanityLoss = true         // Extra SP protection
```

**What it does:**
- Prevents horror, injury, and sanity loss for the first X turns
- Allows peaceful exploration and character establishment
- Temperature cannot rise above the specified maximum
- Automatically deactivates after duration expires

**Use cases:**
- **Long introduction:** `gracePeriodDuration = 20`
- **Quick start:** `gracePeriodDuration = 5`
- **No grace period:** `state.enableGracePeriod = false`
- **Manual control:** Use `/grace off` command to end early

### Advanced Features

```javascript
state.enableGenreDetection = true        // Dynamic genre/theme/style detection
state.enableLocationTracking = true      // Automatic location tracking (requires library.js)
state.enableBonepokeSystem = true        // Advanced narrative archetypes

state.authorsNoteLockDuration = 5        // Turns to lock author's note after player input
```

**Recommendations:**
- For non-Lovecraft stories: Set `enableGenreDetection = false`
- For generic pacing only: Disable all three advanced features
- For full experience: Keep all enabled

---

## 🎮 Player Commands

Type these commands as your action in AI Dungeon:

### Temperature Control

```
/tempup [amount]     - Increase temperature (default: 1)
/tempdown [amount]   - Decrease temperature (default: 1)
/tempmax             - Set temperature to maximum
/tempmin             - Set temperature to minimum
```

**Examples:**
- `/tempup` → Increases tension by 1
- `/tempup 5` → Jumps tension by 5 levels
- `/tempmax` → Forces climactic scene

### HP/SP Control

```
/hp [value]          - Set HP to value, or display current HP
/sp [value]          - Set SP to value, or display current SP
/heal [amount]       - Restore HP (default: 20)
/restore [amount]    - Restore SP (default: 20)
```

**Examples:**
- `/hp` → Displays current HP
- `/hp 50` → Sets HP to 50
- `/heal` → Restores 20 HP
- `/restore 30` → Restores 30 SP

### Grace Period Control

```
/grace [turns]       - Activate grace period for X turns
/grace off           - Deactivate grace period immediately
/grace               - Check grace period status
```

**Examples:**
- `/grace 15` → Activates 15-turn grace period
- `/grace off` → Ends grace period immediately

### Status Check

```
/status              - Display all current values
```

**Output example:**
```
Turn: 45 | Temp: 8 | Heat: 3 | HP: 65/100 | SP: 42/100 | Grace: Inactive
```

---

## 📖 How It Works

### Temperature Phases

The story progresses through phases based on temperature:

| Temperature | Phase | Description |
|-------------|-------|-------------|
| 1 | Introduction | Peaceful scene-setting, no conflict |
| 2-4 | Introduction | Character/location introduction, minor plot hooks |
| 5-9 | Rising Action | Increasing conflicts, hints of greater threats |
| 10-12 | Climax | Major conflicts, character limits tested |
| 13-15 | Ultimate Climax | Extremely difficult challenges, high stakes |

**After Overheat → Cooldown Mode:**
- Temperature gradually decreases
- Story enters Downtime → Falling Action phases
- Allows for rest and recovery before next arc

### Keyword Detection

The system analyzes every turn for specific word types:

**Conflict Words** → Increase heat/temperature:
- attack, destroy, fight, kill, burn, etc.

**Calming Words** → Decrease heat/temperature:
- rest, calm, heal, sleep, meditate, etc.

**Injury Words** → Decrease HP:
- wound, hurt, bleeding, broken, pain, etc.

**Healing Words** → Increase HP:
- heal, bandage, medicine, rest, recover, etc.

**Dread Words** → Decrease SP:
- horror, madness, nightmare, eldritch, cosmic, etc.

**Rationality Words** → Increase SP:
- logic, reason, science, analyze, evidence, etc.

### HP System Mechanics

1. **Injury Detection:** Counts injury words in player/AI text
2. **Damage Calculation:** `injury_words × playerInjuryImpact`
3. **HP Reduction:** HP decreases by damage amount
4. **Status Effects:** Physical difficulty descriptions added to author's note
5. **Whip-poor-will:** Random chance to appear when HP critical

**Example:**
- Player: "I stumble and fall, cutting my arm on broken glass. Blood drips from the wound."
- Detected words: cut, blood, wound (3 injury words)
- Damage: 3 × 10 = 30 HP lost
- New HP: 70/100 (Injured status)

### SP System Mechanics

1. **Dread Detection:** Counts horror words in player/AI text
2. **Sanity Loss:** `dread_words × playerSanityLossImpact`
3. **SP Reduction:** SP decreases by sanity loss
4. **Hallucinations:** Random chance when SP critical
5. **Delusions:** Random paranoid beliefs when SP critical

**Example:**
- AI: "The shadows crawl with impossible geometry. You glimpse things that should not be, and madness whispers at the edge of your mind."
- Detected words: shadows, impossible, madness, whispers (4 dread words)
- Sanity loss: 4 × 8 = 32 SP lost
- New SP: 18/100 (Critical - hallucinations may occur)

### Hallucinations & Delusions

**When SP reaches critical levels:**

**Hallucinations** (sensory):
- "shadows writhing at the edge of vision"
- "whispers in a language never spoken by human tongues"
- "colors shifting into hues that shouldn't exist"
- "geometric patterns that hurt to perceive"

**Delusions** (beliefs):
- "A creeping certainty that everyone is in on a conspiracy against you."
- "The belief that you have already died and this is the afterlife."
- "A conviction that you are being replaced, piece by piece, by something else."
- "The feeling that your thoughts are not your own."

These appear in the author's note, guiding the AI to incorporate them into the narrative.

---

## 🎨 Advanced: Bonepoke System

The Bonepoke system detects four narrative archetypes:

| Archetype | Keywords | Effect |
|-----------|----------|--------|
| **Lift** | uncover, learn, research, overcome | Knowledge gained, but at cost |
| **Drop** | memory, grief, loss, madness, spiral | Psychological horror, trauma |
| **Shear** | impossible, wrong, non-euclidean, rupture | Reality breaks, cosmic horror |
| **Invert** | betray, reveal, paradox, deceive | Truth inverted, contradictions |

**How it works:**
- Text is analyzed for archetype keywords
- Highest scoring archetype becomes Primary (P), second is Secondary (S)
- Directive is added to author's note to guide AI
- Special events can trigger based on archetype

**Example:**
- Player: "I translate the forbidden tome, uncovering secrets that should remain buried."
- Detected: Lift(P) - knowledge archetype
- Directive: "The primary focus should be the cost of knowledge (the physical or mental price of discovery)."
- AI responds with consequences of learning forbidden knowledge

---

## 🗺️ Location Tracking (Optional)

If using `library.js`:

1. Script automatically detects location keywords in text
2. Updates `state.currentLocation`
3. Injects contextual lore into author's note

**Example:**
- Player: "I enter the Orne Library."
- Script detects: "orne library" → Updates location
- Context injected: `Loc:Orne-Library(Miskatonic-Campus). Hub:(Faction)Orne-Library-Division. Threat:Byakhee(Summoned). Nearby:Miskatonic-Quad,Special-Collections-Vault`
- AI uses this context to generate accurate descriptions

---

## 🔧 Customization Examples

### Example 1: Pulp Adventure (No Horror)

```javascript
state.enableSPSystem = false                    // No sanity tracking
state.enableWhippoorwill = false                // No stalking bird
state.enableGenreDetection = false              // No Lovecraft themes
state.enableBonepokeSystem = false              // No narrative archetypes

state.maximumTemperature = 10                   // Lower max tension
state.temperatureIncreaseChance = 12            // Faster pacing
state.playerHealingImpact = 10                  // Easier healing
```

### Example 2: Hardcore Survival Horror

```javascript
state.initialHP = 50                            // Lower starting health
state.maximumHP = 50
state.playerInjuryImpact = 15                   // More damage
state.playerHealingImpact = 3                   // Slower healing

state.hpCriticalThreshold = 30                  // Larger critical zone
state.whippoorwillActivationThreshold = 50      // Frequent stalking

state.playerSanityLossImpact = 12               // Rapid sanity loss
state.hallucinationChance = 30                  // Frequent hallucinations

state.gracePeriodDuration = 3                   // Minimal grace period
```

### Example 3: Psychological Horror Focus

```javascript
state.enableHPSystem = false                    // No physical health tracking

state.playerSanityLossImpact = 15               // Severe sanity loss
state.spCriticalThreshold = 40                  // Larger critical zone
state.hallucinationChance = 25
state.delusionChance = 25

state.maximumTemperature = 12
state.temperatureIncreaseChance = 18            // Slower build
state.overheatTimer = 6                         // Longer climax
```

### Example 4: Mystery/Investigation

```javascript
state.enableWhippoorwill = false                // No death omens
state.enableSPSystem = true                     // Keep sanity for discoveries

state.maximumTemperature = 8                    // Lower tension ceiling
state.temperatureIncreaseChance = 20            // Very slow escalation
state.gracePeriodDuration = 15                  // Long peaceful investigation

state.playerSanityLossImpact = 5                // Mild sanity effects
state.playerInjuryImpact = 8                    // Moderate injury
```

---

## 🐛 Troubleshooting

### "HP/SP not changing"

**Solution:** Check that systems are enabled:
```javascript
state.enableHPSystem = true
state.enableSPSystem = true
```

### "Grace period never ends"

**Solution:** Use `/grace off` command, or check:
```javascript
state.gracePeriodDuration = 10  // Not too high
```

### "Temperature stuck at maximum"

**Solution:** Ensure overheat/cooldown is working:
```javascript
state.overheatTimer = 4         // Should be > 0
state.cooldownTimer = 5         // Should be > 0
```

### "Whip-poor-will never appears"

**Solution:** Check settings:
```javascript
state.enableWhippoorwill = true
state.whippoorwillActivationThreshold = 25  // Not too low
// Also ensure HP is below hpCriticalThreshold
```

### "Hallucinations too frequent"

**Solution:** Reduce chance:
```javascript
state.hallucinationChance = 5    // Lower percentage
state.delusionChance = 5
```

### "My custom author's note disappeared"

**Good news:** This script preserves your notes!
- Your custom content appears after ` --- ` separator
- Script updates its section, yours remains intact

---

## 📊 Console Logging

The script logs detailed information every turn. View in AI Dungeon console:

```
System state initialized.
HP System enabled. Starting HP: 100
SP System enabled. Starting SP: 100
Grace Period activated for 10 turns.

Turn:1 | Heat:1 | Temp:1 | HP:100 | SP:100 | Grace:9
Grace period: 9 turns remaining

Detected 2 injury words. HP reduced by 20. Current HP: 80
Detected 1 dread words. SP reduced by 8. Current SP: 92

Location updated to: Orne-Library

Temperature increased. Temperature is now 5

Overheat Mode Activated
Cooldown Mode Activated

Turn:25 | Heat:0 | Temp:12 | HP:55 | SP:68 | Grace:Inactive
```

---

## 📝 Technical Details

### Script Execution Order

1. **library.js** (Input Modifier #1) - Loads lore data into `state.loreData`
2. **hybrid-arkham-engine.js** (Input Modifier #2) - Main script, uses lore data

### State Variables

All persistent data stored in `state` object:
- `state.heat` - Short-term tension accumulator
- `state.storyTemperature` - Long-term narrative phase
- `state.hp` - Current health points
- `state.sp` - Current sanity points
- `state.cooldownMode` - Boolean for cooldown state
- `state.overheatMode` - Boolean for overheat state
- `state.gracePeriodActive` - Boolean for grace period
- `state.currentLocation` - Current story location
- `state.turnCount` - Total turns elapsed

### Author's Note Structure

**With advanced features enabled:**
```
[Phase:Rising Action...] [Genre:Noir-Detective(P)] [Theme:Forbidden-Knowledge(P)]
[Style:Atmospheric-Dread(P)] [Directive:Focus on...] [Context:Loc:Orne-Library...]
[HP:LOW-Physical activities difficult] [SP:UNSTABLE-Reality feels thin]
--- Your custom author's note here
```

**Basic (without advanced features):**
```
Story Phase: Rising Action. Introduce conflicts... [HP:INJURED...] [SP:SHAKEN...]
--- Your custom author's note here
```

---

## 🎓 Best Practices

### Starting a New Story

1. **Set configuration** before first turn
2. **Test with `/status`** command to verify initialization
3. **Use grace period** to establish characters and setting
4. **Monitor HP/SP** in console logs
5. **Adjust settings** mid-game if needed with commands

### During Play

- **Let temperature rise naturally** for organic pacing
- **Use `/heal` and `/restore`** sparingly for resource management
- **Avoid spamming conflict words** if you want slower pacing
- **Include healing/rationality words** during downtime for recovery
- **Check `/status`** regularly to track systems

### Ending Grace Period

- **Natural expiration** after set turns
- **Manual:** `/grace off` when ready for horror
- **Temperature will jump** once grace ends - be prepared!

### Balancing Difficulty

- **Too easy?** Increase `playerInjuryImpact` and `playerSanityLossImpact`
- **Too hard?** Increase `playerHealingImpact` and `playerSanityGainImpact`
- **Adjust thresholds** to change when effects trigger

---

## 🤝 Contributing

Want to customize further? Key areas to modify:

1. **Keyword Lists** (lines 103-315) - Add/remove words for detection
2. **Hallucination Templates** (line 318) - Add custom hallucinations
3. **Whip-poor-will Descriptions** (line 332) - Add custom death omen text
4. **Phase Descriptions** (lines 850-950) - Customize temperature phases
5. **Thresholds** (configuration section) - Fine-tune difficulty

---

## 📜 Version History

### v2.0 - Hybrid Edition
- ✨ Merged generic and Arkham-specific features
- ✨ Added HP system with physical difficulty tracking
- ✨ Added SP system with hallucinations/delusions
- ✨ Added whip-poor-will stalking mechanic
- ✨ Added modular grace period system
- ✨ User author's note preservation
- ✨ Token-based word matching (more accurate)
- ✨ Comprehensive player commands
- ✨ Improved code formatting and documentation
- 🐛 Fixed spelling errors in phase descriptions
- 🐛 Fixed keyword detection accuracy

### v1.0 - Arkham Fate Engine
- Initial Lovecraftian horror pacing system
- Temperature/heat mechanics
- Genre/theme/style detection
- Bonepoke narrative system
- Location tracking

---

## 📄 License

This script is provided as-is for AI Dungeon use. Modify and distribute freely.

---

## 🆘 Support

Issues or questions? Check:
1. This README
2. Console logs for errors
3. Try `/status` command to diagnose
4. Verify script execution order (library → engine)

---

**Happy storytelling! May your tales be filled with dread and wonder.** 🌙
