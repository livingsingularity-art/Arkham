# Validation Reference - Arkham Fate Engine v2.1

This document details all configuration value ranges and validation rules implemented in v2.1.

---

## Overview

Version 2.1 includes comprehensive value validation to ensure:
- All configuration values stay within rational bounds
- AI Dungeon compatibility is maintained
- Edge cases (NaN, undefined, null) are handled
- Logical relationships between values are enforced

---

## Value Validation Ranges

### Temperature & Heat System

| Variable | Range | Default | Description |
|----------|-------|---------|-------------|
| `initialHeatValue` | 0-100 | 0 | Starting heat accumulation |
| `initialTemperatureValue` | 1-50 | 1 | Starting story tension level |
| `temperatureIncreaseChance` | 1-100 | 15 | % chance heat converts to temp |
| `heatIncreaseValue` | 0-10 | 1 | Heat gained per turn |
| `temperatureIncreaseValue` | 0-5 | 1 | Temperature increase on trigger |
| `playerIncreaseHeatImpact` | 0-20 | 2 | Player conflict word multiplier |
| `playerDecreaseHeatImpact` | 0-20 | 2 | Player calming word multiplier |
| `playerIncreaseTemperatureImpact` | 0-10 | 1 | Direct player temp increase |
| `playerDecreaseTemperatureImpact` | 0-10 | 1 | Direct player temp decrease |
| `threshholdPlayerIncreaseTemperature` | 1-20 | 2 | Words needed to increase temp |
| `threshholdPlayerDecreaseTemperature` | 1-20 | 2 | Words needed to decrease temp |
| `modelIncreaseHeatImpact` | 0-20 | 1 | AI conflict word multiplier |
| `modelDecreaseHeatImpact` | 0-20 | 2 | AI calming word multiplier |
| `modelIncreaseTemperatureImpact` | 0-10 | 1 | Direct AI temp increase |
| `modelDecreaseTemperatureImpact` | 0-10 | 1 | Direct AI temp decrease |
| `threshholdModelIncreaseTemperature` | 1-20 | 3 | AI words needed for temp+ |
| `threshholdModelDecreaseTemperature` | 1-20 | 3 | AI words needed for temp- |
| `maximumTemperature` | 1-50 | 12 | Overheat trigger point |
| `trueMaximumTemperature` | 1-50 | 15 | Absolute maximum (≥ max) |
| `minimumTemperature` | 1-50 | 1 | Soft minimum bound |
| `trueMinimumTemperature` | 1-50 | 1 | Absolute minimum (≤ min) |
| `overheatTimer` | 1-50 | 4 | Turns before cooldown starts |
| `overheatReductionForHeat` | 0-100 | 5 | Heat reduced on cooldown |
| `overheatReductionForTemperature` | 0-10 | 1 | Temp reduced on cooldown |
| `cooldownTimer` | 1-50 | 5 | Cooldown duration in turns |
| `cooldownRate` | 0-10 | 2 | Temp decrease per turn |
| `randomExplosionChance` | 0-100 | 3 | % chance for random spike |
| `randomExplosionHeatIncreaseValue` | 0-50 | 5 | Heat added on explosion |
| `randomExplosionTemperatureIncreaseValue` | 0-10 | 2 | Temp added on explosion |

**Logical Constraints:**
- `trueMaximumTemperature` ≥ `maximumTemperature` (auto-adjusted)
- `trueMinimumTemperature` ≤ `minimumTemperature` (auto-adjusted)

---

### HP (Health Points) System

| Variable | Range | Default | Description |
|----------|-------|---------|-------------|
| `enableHPSystem` | Boolean | true | Toggle HP tracking |
| `initialHP` | 1-1000 | 100 | Starting health |
| `maximumHP` | 1-1000 | 100 | Maximum possible health |
| `hpCriticalThreshold` | 0-maximumHP | 25 | Critical status trigger |
| `hpLowThreshold` | 0-maximumHP | 50 | Low status trigger |
| `hpInjuredThreshold` | 0-maximumHP | 75 | Injured status trigger |
| `playerInjuryImpact` | 0-100 | 10 | Damage per injury word |
| `modelInjuryImpact` | 0-100 | 5 | AI-caused damage multiplier |
| `playerHealingImpact` | 0-100 | 5 | Healing per healing word |
| `modelHealingImpact` | 0-100 | 3 | AI-caused healing multiplier |
| `threshholdPlayerInjury` | 0-20 | 1 | Words needed for injury |
| `threshholdPlayerHealing` | 0-20 | 1 | Words needed for healing |
| `threshholdModelInjury` | 0-20 | 2 | AI words for injury |
| `threshholdModelHealing` | 0-20 | 2 | AI words for healing |
| `enableWhippoorwill` | Boolean | true | Toggle stalking bird |
| `whippoorwillActivationThreshold` | 0-100 | 25 | % chance when HP critical |
| `whippoorwillIntensityMultiplier` | 0.1-10 | 1 | Frequency multiplier |

**Logical Constraints:**
- `hpCriticalThreshold` < `hpLowThreshold` < `hpInjuredThreshold` (auto-adjusted)
- If critical > low: critical = low × 0.5
- If low > injured: low = injured × 0.67

---

### SP (Sanity Points) System

| Variable | Range | Default | Description |
|----------|-------|---------|-------------|
| `enableSPSystem` | Boolean | true | Toggle sanity tracking |
| `initialSP` | 1-1000 | 100 | Starting sanity |
| `maximumSP` | 1-1000 | 100 | Maximum possible sanity |
| `spCriticalThreshold` | 0-maximumSP | 25 | Critical sanity trigger |
| `spUnstableThreshold` | 0-maximumSP | 50 | Unstable sanity trigger |
| `spShakenThreshold` | 0-maximumSP | 75 | Shaken sanity trigger |
| `playerSanityLossImpact` | 0-100 | 8 | Loss per dread word |
| `playerSanityGainImpact` | 0-100 | 5 | Gain per rationality word |
| `modelSanityLossImpact` | 0-100 | 4 | AI-caused sanity loss |
| `modelSanityGainImpact` | 0-100 | 3 | AI-caused sanity gain |
| `threshholdPlayerSanityLoss` | 0-20 | 1 | Words needed for loss |
| `threshholdPlayerSanityGain` | 0-20 | 1 | Words needed for gain |
| `threshholdModelSanityLoss` | 0-20 | 2 | AI words for loss |
| `threshholdModelSanityGain` | 0-20 | 2 | AI words for gain |
| `hallucinationChance` | 0-100 | 15 | % chance when SP critical |
| `delusionChance` | 0-100 | 10 | % chance when SP critical |

**Logical Constraints:**
- `spCriticalThreshold` < `spUnstableThreshold` < `spShakenThreshold` (auto-adjusted)
- If critical > unstable: critical = unstable × 0.5
- If unstable > shaken: unstable = shaken × 0.67

---

### Grace Period System

| Variable | Range | Default | Description |
|----------|-------|---------|-------------|
| `enableGracePeriod` | Boolean | true | Toggle grace period |
| `gracePeriodDuration` | 0-100 | 10 | Duration in turns |
| `gracePeriodPreventsDread` | Boolean | true | Block dread effects |
| `gracePeriodPreventsInjury` | Boolean | true | Block injury |
| `gracePeriodPreventsSanityLoss` | Boolean | true | Block sanity loss |
| `gracePeriodMaxTemperature` | 1-50 | 3 | Temperature cap during grace |

---

### Advanced Features

| Variable | Range | Default | Description |
|----------|-------|---------|-------------|
| `authorsNoteLockDuration` | 0-20 | 5 | Turns to lock author's note |
| `enableGenreDetection` | Boolean | true | Toggle genre/theme/style |
| `enableLocationTracking` | Boolean | true | Toggle location detection |
| `enableBonepokeSystem` | Boolean | true | Toggle narrative archetypes |

---

## Validation Function Behavior

### Type Coercion

All numeric values are coerced using `Number()`:
```javascript
const clamp = (value, min, max) => {
  const num = Number(value)
  if (isNaN(num)) return min  // Invalid → use minimum
  return Math.max(min, Math.min(num, max))
}
```

**Handles:**
- `undefined` → min value
- `null` → min value
- `NaN` → min value
- Strings: `"50"` → 50
- Out of range: clamped to min/max

### Boolean Coercion

```javascript
const bool = (value) => {
  return value === true || value === "true" || value === 1
}
```

**Returns true for:**
- `true`
- `"true"`
- `1`

**Returns false for everything else:**
- `false`, `"false"`, `0`, `undefined`, `null`, etc.

---

## AI Dungeon Compatibility Measures

### 1. No Template Literals in Strings

**Problem:** AI Dungeon may not support ES6 template literals.

**Solution:** All string concatenation uses `+` operator:
```javascript
// ❌ Avoid
log(`Temperature: ${state.temp}`)

// ✅ Use
log("Temperature: " + state.temp)
```

### 2. Null/Undefined Checks

**Problem:** GraphQL serialization shows `null` instead of `undefined`.

**Solution:** Explicit checks for both:
```javascript
if (typeof state.hp === 'undefined' || state.hp === null) {
  state.hp = state.initialHP
}
```

### 3. Safe Array Access

**Problem:** Accessing undefined arrays causes errors.

**Solution:** Check before iteration:
```javascript
if (loreLibrary && loreLibrary.locations) {
  for (const locKey in loreLibrary.locations) {
    if (loreLibrary.locations.hasOwnProperty(locKey)) {
      // Safe to access
    }
  }
}
```

### 4. Safe Function Calls

**Problem:** Functions may not exist or arrays may be empty.

**Solution:** Defensive checks:
```javascript
function randomChoice(array) {
  if (!array || array.length === 0) return ""
  return array[randomint(0, array.length - 1)]
}
```

### 5. State Persistence

**Problem:** State must survive between turns.

**Solution:** All data stored in `state` object:
```javascript
state.hp = 100           // ✅ Persists
let tempVariable = 100   // ❌ Doesn't persist
```

### 6. Memory Access

**Problem:** `state.memory` might not exist.

**Solution:** Check before accessing:
```javascript
if (state.memory) {
  state.memory.authorsNote = finalNote
}
```

### 7. Info Object Access

**Problem:** `info` object only exists on certain turns.

**Solution:** Use typeof check:
```javascript
const isPlayerTurn = (typeof info !== 'undefined' &&
                      info !== null &&
                      info.actionType === 'input')
```

---

## Validation Execution

### When Validation Runs

Validation runs **every turn** at the start of `modifier()`:
```javascript
const modifier = (text) => {
  validateAndClampConfig()  // First thing!
  // ... rest of script
}
```

This ensures:
- User modifications to `state` are caught
- Commands that modify values are validated
- Values never exceed rational bounds
- No crashes from invalid values

### What Gets Validated

**Every configuration variable:**
1. Type checked (number/boolean)
2. Range clamped (min/max)
3. Logical relationships enforced
4. NaN/undefined/null handled

---

## Common Validation Scenarios

### Scenario 1: User Sets Invalid Value

**Input:**
```javascript
state.maximumTemperature = 9999
```

**Validation:**
```javascript
state.maximumTemperature = clamp(9999, 1, 50)  // → 50
```

**Result:** Clamped to maximum allowed (50)

---

### Scenario 2: Threshold Inversion

**Input:**
```javascript
state.hpCriticalThreshold = 80
state.hpLowThreshold = 50
```

**Validation:**
```javascript
// Critical > Low is illogical
state.hpCriticalThreshold = Math.floor(50 * 0.5)  // → 25
```

**Result:** Critical auto-adjusted to half of Low

---

### Scenario 3: Boolean as String

**Input:**
```javascript
state.enableHPSystem = "true"
```

**Validation:**
```javascript
state.enableHPSystem = bool("true")  // → true
```

**Result:** Converted to proper boolean

---

### Scenario 4: NaN from Calculation

**Input:**
```javascript
state.heat = state.heat + "invalid"  // → NaN
```

**Validation:**
```javascript
state.heat = clamp(NaN, 0, 100)  // → 0 (min value)
```

**Result:** Reset to minimum safe value

---

## Testing Validation

### Manual Testing Commands

Test validation with extreme values:

```
/hp 9999           → Clamped to maximumHP (100)
/hp -50            → Clamped to 0
/sp 500            → Clamped to maximumSP (100)
/tempup 100        → Clamped to trueMaximumTemperature (50)
```

### JavaScript Console Testing

If you have access to the console:

```javascript
// Set invalid value
state.maximumTemperature = 1000

// Trigger validation (next turn)
// Value will be clamped to 50
```

---

## Performance Considerations

### Validation Cost

**Per-turn overhead:**
- ~50-100 function calls (clamp/bool)
- Negligible performance impact (<1ms)
- Runs only once per turn

**Optimization:**
- Could move validation to initialization only
- Current approach chosen for safety and user modification support

### Memory Usage

**State variables:**
- ~40 numeric variables (8 bytes each) = ~320 bytes
- ~10 boolean variables (1 byte each) = ~10 bytes
- Total: <1KB of state data

**Negligible impact** on AI Dungeon's state storage

---

## Extending Validation

### Adding New Configuration Values

**Step 1:** Add to configuration section with comment:
```javascript
state.myNewValue = 10  // Range: 0-100
```

**Step 2:** Add validation in `validateAndClampConfig()`:
```javascript
state.myNewValue = clamp(state.myNewValue, 0, 100)
```

**Step 3:** Document in this reference

---

### Adding Logical Constraints

**Example:** Ensure value A is always less than value B:

```javascript
// After both are clamped
if (state.valueA > state.valueB) {
  state.valueA = Math.floor(state.valueB * 0.5)
}
```

---

## Error Handling Philosophy

### Fail Gracefully

**Principle:** Never crash, always recover

**Implementation:**
- Invalid values → clamped to safe defaults
- Missing data → use fallback values
- Failed operations → log and continue

**Example:**
```javascript
// Instead of this (crashes on undefined):
const genre = genres[text.toLowerCase()]

// Do this (safe):
const genre = getRankedTones(text, genres)
if (genre === "None") genre = "Noir-Detective(P)"
```

### Logging Over Errors

**Principle:** Log issues, don't throw

**Implementation:**
```javascript
// ❌ Avoid throwing errors
if (!state.hp) throw new Error("HP not initialized!")

// ✅ Log and handle
if (!state.hp) {
  log("HP not initialized, using default")
  state.hp = state.initialHP
}
```

---

## Compatibility Checklist

✅ **All values have rational min/max bounds**
✅ **Type coercion handles edge cases (NaN, undefined, null)**
✅ **Logical relationships enforced (thresholds, temp bounds)**
✅ **No ES6 template literals in critical paths**
✅ **Safe array/object access throughout**
✅ **State persistence used correctly**
✅ **Defensive programming for all external data**
✅ **Graceful degradation on missing features**
✅ **Comprehensive null/undefined checks**
✅ **Boolean coercion from multiple input types**

---

## Version History

### v2.1
- Added comprehensive validation function
- Implemented min/max clamping for all values
- Added logical constraint enforcement
- Removed template literals for compatibility
- Added defensive null/undefined checks
- Improved error handling throughout

### v2.0
- Initial hybrid implementation
- Basic configuration values
- No validation

---

## Support

If you encounter validation issues:

1. Check console logs for warnings
2. Use `/status` command to view current values
3. Review this document for valid ranges
4. Reset to defaults by deleting invalid config lines

---

**Validation ensures stability. Safe bounds ensure enjoyment.** 🛡️
