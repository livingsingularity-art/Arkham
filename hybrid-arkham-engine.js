/* ============================================================================
   ARKHAM FATE ENGINE - HYBRID EDITION (v2.0)

   A comprehensive narrative pacing system combining:
   - Dynamic story temperature/heat mechanics
   - HP (Health Points) system with physical difficulty scaling
   - SP (Sanity Points) system with hallucinations/delusions
   - Lovecraftian genre/theme/style detection
   - Location tracking and lore integration
   - Whip-poor-will stalking mechanic
   - Configurable grace period for horror content
   - User author's note preservation
   - Player commands for manual control

   ============================================================================ */

/* === STORY ARC CONFIGURATION === */

// Temperature & Heat Settings
state.initialHeatValue = 0
state.initialTemperatureValue = 1
state.temperatureIncreaseChance = 15
state.heatIncreaseValue = 1
state.temperatureIncreaseValue = 1

state.playerIncreaseHeatImpact = 2
state.playerDecreaseHeatImpact = 2
state.playerIncreaseTemperatureImpact = 1
state.playerDecreaseTemperatureImpact = 1
state.threshholdPlayerIncreaseTemperature = 2
state.threshholdPlayerDecreaseTemperature = 2

state.modelIncreaseHeatImpact = 1
state.modelDecreaseHeatImpact = 2
state.modelIncreaseTemperatureImpact = 1
state.modelDecreaseTemperatureImpact = 1
state.threshholdModelIncreaseTemperature = 3
state.threshholdModelDecreaseTemperature = 3

state.maximumTemperature = 12
state.trueMaximumTemperature = 15
state.minimumTemperature = 1
state.trueMinimumTemperature = 1

state.overheatTimer = 4
state.overheatReductionForHeat = 5
state.overheatReductionForTemperature = 1
state.cooldownTimer = 5
state.cooldownRate = 2

state.randomExplosionChance = 3
state.randomExplosionHeatIncreaseValue = 5
state.randomExplosionTemperatureIncreaseValue = 2

// HP (Health Points) Settings
state.enableHPSystem = true
state.initialHP = 100
state.maximumHP = 100
state.hpCriticalThreshold = 25
state.hpLowThreshold = 50
state.hpInjuredThreshold = 75

state.playerInjuryImpact = 10
state.modelInjuryImpact = 5
state.playerHealingImpact = 5
state.modelHealingImpact = 3
state.threshholdPlayerInjury = 1
state.threshholdPlayerHealing = 1
state.threshholdModelInjury = 2
state.threshholdModelHealing = 2

state.enableWhippoorwill = true
state.whippoorwillActivationThreshold = 25
state.whippoorwillIntensityMultiplier = 1

// SP (Sanity Points) Settings
state.enableSPSystem = true
state.initialSP = 100
state.maximumSP = 100
state.spCriticalThreshold = 25
state.spUnstableThreshold = 50
state.spShakenThreshold = 75

state.playerSanityLossImpact = 8
state.playerSanityGainImpact = 5
state.modelSanityLossImpact = 4
state.modelSanityGainImpact = 3
state.threshholdPlayerSanityLoss = 1
state.threshholdPlayerSanityGain = 1
state.threshholdModelSanityLoss = 2
state.threshholdModelSanityGain = 2

state.hallucinationChance = 15
state.delusionChance = 10

// Grace Period Settings (Horror Prevention)
state.enableGracePeriod = true
state.gracePeriodDuration = 10
state.gracePeriodPreventsDread = true
state.gracePeriodPreventsInjury = true
state.gracePeriodPreventsSanityLoss = true
state.gracePeriodMaxTemperature = 3

// Author's Note Lock Settings
state.authorsNoteLockDuration = 5

// Advanced Features Toggle
state.enableGenreDetection = true
state.enableLocationTracking = true
state.enableBonepokeSystem = true


/* === KEYWORD DICTIONARIES === */

// Basic conflict/calming for temperature
const conflictWords = [
  "attack", "stab", "destroy", "break", "steal", "ruin", "burn", "smash",
  "sabotage", "disrupt", "vandalize", "overthrow", "assassinate", "plunder",
  "rob", "ransack", "raid", "hijack", "detonate", "explode", "ignite",
  "collapse", "demolish", "shatter", "strike", "slap", "obliterate",
  "annihilate", "corrupt", "infect", "poison", "curse", "hex", "summon",
  "conjure", "mutate", "provoke", "riot", "revolt", "mutiny", "rebel",
  "resist", "intimidate", "blackmail", "manipulate", "brainwash", "lie",
  "cheat", "swindle", "disarm", "fire", "hack", "overload", "flood",
  "drown", "rot", "dissolve", "slaughter", "terminate", "execute", "drama",
  "conflict", "evil", "kill", "slay", "defeat", "fight", "doom", "slice",
  "pain", "dying", "die", "perish", "blood"
]

const calmingWords = [
  "calm", "rest", "relax", "meditate", "sleep", "comfort", "hug", "smile",
  "forgive", "mend", "repair", "plant", "sing", "dance", "celebrate",
  "collaborate", "share", "give", "donate", "protect", "shelter", "trust",
  "hope", "dream", "revive", "eat", "drink", "balance", "cheer", "laugh",
  "play", "build", "bake", "craft", "cook", "empathize", "apologize",
  "befriend", "admire", "sympathize", "thank", "appreciate", "cherish",
  "love", "pet", "respect", "restore", "guide", "teach", "learn",
  "daydream", "wander", "explore", "discover", "reflect", "happy", "joy",
  "kind", "heal", "help", "assist"
]

// Lovecraftian horror words for sanity loss
const dreadWords = [
  "fear", "horror", "terror", "dread", "madness", "insanity", "nightmare",
  "shadow", "darkness", "abyss", "void", "whisper", "scream", "shriek",
  "gibber", "crawl", "slither", "squamous", "rugose", "eldritch", "cyclopean",
  "unholy", "blasphemous", "profane", "tainted", "corrupt", "stench", "ichor",
  "viscous", "cthulhu", "azathoth", "nyarlathotep", "yog-sothoth", "shoggoth",
  "mi-go", "non-euclidean", "angled", "wrong", "unnamable", "unspeakable",
  "indescribable", "ritual", "summon", "sacrifice", "cult", "idol", "tome",
  "grimoire", "necronomicon", "innsmouth", "dunwich", "arkham", "decay",
  "degenerate", "foul", "ancient", "aeon", "cosmic", "star", "abomination",
  "monster", "creature", "thing", "entity", "god", "guts", "gore", "death",
  "agony", "torment", "curse", "doom", "apocalypse"
]

// Rationality words for sanity gain
const rationalityWords = [
  "logic", "reason", "science", "analyze", "examine", "study", "research",
  "document", "record", "measure", "calculate", "rationalize", "explain",
  "mundane", "normal", "ordinary", "sane", "stable", "calm", "order", "law",
  "system", "method", "proof", "evidence", "fact", "reality", "truth",
  "clarify", "illuminate", "understand", "comprehend", "secure", "contain",
  "protect", "ward", "banish", "seal", "lock", "barricade", "reinforce",
  "hope", "faith", "prayer", "humanity", "civilization", "society", "progress",
  "future", "help", "assist", "aid", "comfort", "console", "reassure"
]

// Injury words for HP loss
const injuryWords = [
  "wound", "wounded", "hurt", "injured", "damage", "damaged", "bleeding",
  "bleed", "broken", "fracture", "cut", "slash", "gash", "pierce", "pierced",
  "stab", "stabbed", "shot", "burn", "burned", "bruise", "bruised", "maimed",
  "crippled", "disabled", "limping", "limp", "dizzy", "weak", "weakened",
  "exhausted", "fatigued", "tired", "aching", "sore", "pain", "painful",
  "suffering", "agony", "trauma", "concussion", "fever", "sick", "ill",
  "nauseous", "vomit", "collapse", "collapsed", "unconscious", "faint",
  "fainted", "dying", "critical", "fatal"
]

// Healing words for HP gain
const healingWords = [
  "heal", "healed", "healing", "rest", "rested", "resting", "sleep", "slept",
  "sleeping", "recover", "recovered", "recovering", "recuperate", "bandage",
  "bandaged", "medicine", "medicate", "cure", "cured", "treat", "treated",
  "treatment", "remedy", "salve", "potion", "elixir", "regenerate", "restore",
  "restored", "mend", "mended", "repair", "repaired", "revive", "revived",
  "rejuvenate", "strengthen", "strengthened", "energize", "energized",
  "refresh", "refreshed", "nourish", "nourished", "healthy", "better",
  "improved", "stable", "stabilize", "stabilized"
]

// Genre detection
const genres = {
  "Noir-Detective": [
    "clue", "interrogate", "shadow", "rain", "informant", "case", "file",
    "precinct", "inspector", "motive", "crime", "deception", "detective",
    "investigation", "suspect", "alibi", "evidence"
  ],
  "Academic-Gothic": [
    "library", "tome", "manuscript", "scholar", "ivy", "dust", "forbidden",
    "university", "professor", "archives", "relic", "ancient", "research",
    "study", "knowledge", "book", "text"
  ],
  "Conspiracy-Thriller": [
    "secret", "hidden", "redacted", "faction", "order", "they", "watching",
    "cabal", "plot", "uncover", "secrecy", "conspiracy", "cover-up",
    "classified", "surveillance", "paranoia"
  ],
  "Psychological-Horror": [
    "madness", "insane", "dread", "forget", "reality", "nightmare", "unreal",
    "losing", "mind", "sanity", "dream", "hallucination", "delusion",
    "paranoid", "breakdown", "unstable"
  ],
  "Body-Horror": [
    "flesh", "transform", "mutate", "viscous", "ichor", "unholy", "birth",
    "appendage", "hybrid", "inside-out", "mutation", "deform", "grotesque",
    "organ", "tissue", "metamorphosis"
  ],
  "Pulp-Adventure": [
    "explore", "discover", "jungle", "temple", "ruin", "expedition", "danger",
    "escape", "chase", "artifact", "treasure", "quest", "adventure", "journey"
  ]
}

// Theme detection
const themes = {
  "Forbidden-Knowledge": [
    "learn", "read", "know", "secret", "cipher", "translate", "tome",
    "manuscript", "lore", "peril", "curiosity", "forbidden", "knowledge",
    "discover", "revelation", "truth", "wisdom"
  ],
  "Tainted-Lineage": [
    "bloodline", "ancestor", "family", "curse", "heritage", "born",
    "descendant", "heir", "degeneration", "lineage", "blood", "legacy",
    "inheritance", "generation"
  ],
  "Cosmicism-Insignificance": [
    "insignificant", "dust", "vast", "uncaring", "meaningless", "void",
    "empty", "silent", "stars", "cosmic", "infinite", "universe", "eternal",
    "scale", "nothing", "futile"
  ],
  "Science-vs-Supernatural": [
    "science", "logic", "reason", "explain", "rationalize", "reagent",
    "physics", "ritual", "magic", "summon", "supernatural", "experiment",
    "theory", "empirical", "mystical"
  ],
  "The-Past-is-a-Predator": [
    "history", "past", "memory", "ghost", "haunting", "echo", "return",
    "legacy", "ancient", "forgotten", "buried", "resurface", "haunt",
    "remember", "recall"
  ]
}

// Style detection
const styles = {
  "Atmospheric-Dread": [
    "quiet", "silence", "shadow", "creeping", "unease", "wrong", "unseen",
    "looming", "oppressive", "cold", "damp", "fog", "mist", "darkness",
    "stillness", "waiting"
  ],
  "Suspenseful-Thriller": [
    "danger", "cornered", "trap", "chase", "escape", "sudden", "imminent",
    "heartbeat", "breathless", "urgent", "racing", "panic", "flee", "pursue",
    "threat", "close"
  ],
  "Unreliable-Narration": [
    "dream", "unreal", "forget", "memory", "confused", "vision",
    "hallucination", "was-it-real", "imagine", "imagined", "uncertain",
    "doubt", "question", "perhaps", "maybe"
  ]
}

// Bonepoke narrative directives
const bonepoke = {
  lift: [
    "uncover", "learn", "read", "translate", "decipher", "research", "study",
    "connect", "realize", "understand", "examine", "analyze", "investigate",
    "pursue", "confront", "survive", "resist", "endure", "overcome", "earn",
    "achieve", "triumph", "solve"
  ],
  drop: [
    "memory", "dream", "past", "history", "ancestor", "bloodline", "legacy",
    "curse", "grief", "loss", "madness", "nightmare", "hallucination",
    "whisper", "echo", "return", "spiral", "dread", "despair", "fall",
    "weep", "mourn", "regret"
  ],
  shear: [
    "impossible", "wrong", "non-euclidean", "angled", "geometry", "reality",
    "unreal", "twist", "warp", "distort", "glimpse", "shadow", "other",
    "beyond", "threshold", "rupture", "break", "shatter", "collapse",
    "unravel", "fragment", "fracture"
  ],
  invert: [
    "secret", "lie", "hidden", "mask", "facade", "truth", "reveal", "betray",
    "opposite", "reflection", "mirror", "double", "paradox", "contradiction",
    "irony", "reverse", "undo", "unmask", "usurp", "replace", "deceive",
    "trick", "false"
  ]
}

// Hallucination templates (for SP critical)
const hallucinationTemplates = [
  "shadows writhing at the edge of vision",
  "whispers in a language never spoken by human tongues",
  "the walls seeming to breathe and pulse",
  "familiar faces distorting into alien expressions",
  "time becoming elastic and unreliable",
  "sounds echoing from impossible directions",
  "colors shifting into hues that shouldn't exist",
  "geometric patterns that hurt to perceive",
  "memories that never happened feeling viscerally real",
  "the certainty that something is watching from behind"
]

// Whip-poor-will descriptions (for HP critical)
const whippoorwillDescriptions = [
  "The distinctive three-syllable call echoes nearby: 'whip-poor-will, whip-poor-will.'",
  "A small bird's shadow flits across your path. Its call follows: 'whip-poor-will.'",
  "From the darkness comes that haunting refrain: 'whip-poor-will, whip-poor-will.'",
  "The whip-poor-will's cry grows closer, more insistent, as if drawn to weakness.",
  "That cursed bird calls again—'whip-poor-will'—a harbinger of death's approach.",
  "The relentless 'whip-poor-will' echoes in the shadows, stalking, waiting.",
  "A whip-poor-will perches nearby, its black eyes fixed upon the weakened form.",
  "The night bird's cry pierces the air: 'whip-poor-will.' Death is circling."
]


/* === HELPER FUNCTIONS === */

function randomint(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomChoice(array) {
  return array[randomint(0, array.length - 1)]
}

// Extract user's custom author's note (preserves user customization)
function extractUserAuthorsNote(fullNote) {
  if (!fullNote) return ""

  const separator = " --- "
  const separatorIndex = fullNote.indexOf(separator)

  if (separatorIndex !== -1) {
    return fullNote.substring(separatorIndex + separator.length)
  }

  if (fullNote.includes("Story Phase:") || fullNote.includes("[Phase:")) {
    return ""
  }

  return fullNote
}

// Token-based word counting (more accurate than substring matching)
function countWords(text, wordList) {
  const lowerText = text.toLowerCase()
  const words = lowerText.split(/\s+/)
  let count = 0

  words.forEach(word => {
    const fixedWord = word.replace(/^[^\w]+|[^\w]+$/g, '')
    if (wordList.includes(fixedWord)) {
      count++
    }
  })

  return count
}

// Score text against word dictionary
function scoreText(text, words) {
  const lowerText = text.toLowerCase()
  let score = 0

  words.forEach(word => {
    if (lowerText.includes(word)) score++
  })

  return score
}

// Get ranked tones from text (for genre/theme/style/bonepoke)
function getRankedTones(text, dictionary) {
  let scores = Object.keys(dictionary).map(key => ({
    name: key,
    score: scoreText(text, dictionary[key])
  })).filter(item => item.score > 0)

  scores.sort((a, b) => b.score - a.score)

  if (scores.length === 0) return "None"

  let rankedString = `${scores[0].name}(P)`
  if (scores.length > 1 && scores[1].score > 0) {
    rankedString += `,${scores[1].name}(S)`
  }

  return rankedString
}


/* === MAIN MODIFIER FUNCTION === */

const modifier = (text) => {
  const isPlayerTurn = typeof info !== 'undefined' && info.actionType === 'input'

  /* --- INITIALIZATION --- */
  if (state.heat === undefined) {
    state.heat = state.initialHeatValue
    state.cooldownMode = false
    state.overheatMode = false
    state.currentLocation = "Arkham"
    state.authorsNoteLockCounter = 0
    state.lockedAuthorsNote = ""
    log("System state initialized.")
  }

  if (state.storyTemperature === undefined) {
    state.storyTemperature = state.initialTemperatureValue
  }

  if (state.hp === undefined && state.enableHPSystem) {
    state.hp = state.initialHP
    log(`HP System enabled. Starting HP: ${state.hp}`)
  }

  if (state.sp === undefined && state.enableSPSystem) {
    state.sp = state.initialSP
    log(`SP System enabled. Starting SP: ${state.sp}`)
  }

  if (state.gracePeriodActive === undefined && state.enableGracePeriod) {
    state.gracePeriodActive = true
    state.gracePeriodTurnsLeft = state.gracePeriodDuration
    log(`Grace Period activated for ${state.gracePeriodDuration} turns.`)
  }

  if (state.turnCount === undefined) {
    state.turnCount = 0
  }

  state.turnCount++

  /* --- AUTHORS NOTE LOCK (SKIP PROCESSING IF LOCKED) --- */
  if (state.authorsNoteLockCounter > 0 && !isPlayerTurn) {
    state.memory.authorsNote = state.lockedAuthorsNote
    state.authorsNoteLockCounter--
    log(`AN LOCK ACTIVE. Turns remaining: ${state.authorsNoteLockCounter}`)
    return { text }
  }

  /* --- PLAYER COMMANDS --- */
  if (text.trim().startsWith('/')) {
    const commandArgs = text.trim().substring(1).split(' ')
    const command = commandArgs[0].toLowerCase()
    const value = parseInt(commandArgs[1])
    let feedback = ""

    switch (command) {
      case 'tempup':
        const raiseAmount = !isNaN(value) ? value : 1
        state.storyTemperature += raiseAmount
        feedback = `Temperature raised by ${raiseAmount}.`
        break

      case 'tempdown':
        const lowerAmount = !isNaN(value) ? value : 1
        state.storyTemperature -= lowerAmount
        feedback = `Temperature lowered by ${lowerAmount}.`
        break

      case 'tempmax':
        state.storyTemperature = state.maximumTemperature
        feedback = `Temperature set to max (${state.maximumTemperature}).`
        break

      case 'tempmin':
        state.storyTemperature = state.minimumTemperature
        feedback = `Temperature set to min (${state.minimumTemperature}).`
        break

      case 'hp':
        if (!isNaN(value)) {
          state.hp = Math.max(0, Math.min(value, state.maximumHP))
          feedback = `HP set to ${state.hp}.`
        } else {
          feedback = `Current HP: ${state.hp}/${state.maximumHP}`
        }
        break

      case 'sp':
        if (!isNaN(value)) {
          state.sp = Math.max(0, Math.min(value, state.maximumSP))
          feedback = `SP set to ${state.sp}.`
        } else {
          feedback = `Current SP: ${state.sp}/${state.maximumSP}`
        }
        break

      case 'heal':
        const healAmount = !isNaN(value) ? value : 20
        state.hp = Math.min(state.hp + healAmount, state.maximumHP)
        feedback = `Healed ${healAmount} HP. Current HP: ${state.hp}`
        break

      case 'restore':
        const restoreAmount = !isNaN(value) ? value : 20
        state.sp = Math.min(state.sp + restoreAmount, state.maximumSP)
        feedback = `Restored ${restoreAmount} SP. Current SP: ${state.sp}`
        break

      case 'grace':
        if (value > 0) {
          state.gracePeriodActive = true
          state.gracePeriodTurnsLeft = value
          feedback = `Grace period activated for ${value} turns.`
        } else if (commandArgs[1] === 'off') {
          state.gracePeriodActive = false
          feedback = "Grace period deactivated."
        } else {
          feedback = state.gracePeriodActive ?
            `Grace period active: ${state.gracePeriodTurnsLeft} turns remaining.` :
            "Grace period inactive."
        }
        break

      case 'status':
        feedback = `Turn: ${state.turnCount} | Temp: ${state.storyTemperature} | Heat: ${state.heat}`
        if (state.enableHPSystem) feedback += ` | HP: ${state.hp}/${state.maximumHP}`
        if (state.enableSPSystem) feedback += ` | SP: ${state.sp}/${state.maximumSP}`
        if (state.gracePeriodActive) feedback += ` | Grace: ${state.gracePeriodTurnsLeft} turns`
        break

      default:
        return { text: `[System: Unknown command '/${command}'.]` }
    }

    state.storyTemperature = Math.max(
      state.trueMinimumTemperature,
      Math.min(state.storyTemperature, state.trueMaximumTemperature)
    )

    const feedbackMessage = `[System: ${feedback}]`
    log(feedbackMessage)
    return { text: feedbackMessage }
  }

  /* --- GRACE PERIOD COUNTDOWN --- */
  if (state.gracePeriodActive && state.gracePeriodTurnsLeft > 0) {
    state.gracePeriodTurnsLeft--
    log(`Grace period: ${state.gracePeriodTurnsLeft} turns remaining`)

    if (state.gracePeriodTurnsLeft <= 0) {
      state.gracePeriodActive = false
      log("Grace period ended.")
    }
  }

  /* --- LOCATION TRACKING (ARKHAM LORE) --- */
  if (state.enableLocationTracking) {
    const loreLibrary = typeof state.loreData !== 'undefined' ? state.loreData : undefined

    if (loreLibrary && loreLibrary.locations) {
      const lowerCurrentText = text.toLowerCase()

      for (const locKey in loreLibrary.locations) {
        if (loreLibrary.locations[locKey].keys.some(key => lowerCurrentText.includes(key))) {
          if (state.currentLocation !== locKey) {
            state.currentLocation = locKey
            log(`Location updated to: ${locKey}`)
          }
          break
        }
      }
    }
  }

  /* --- WORD COUNTING --- */
  const conflictCount = countWords(text, conflictWords)
  const calmingCount = countWords(text, calmingWords)

  let dreadCount = 0
  let rationalityCount = 0
  let injuryCount = 0
  let healingCount = 0

  if (state.enableSPSystem) {
    dreadCount = countWords(text, dreadWords)
    rationalityCount = countWords(text, rationalityWords)
  }

  if (state.enableHPSystem) {
    injuryCount = countWords(text, injuryWords)
    healingCount = countWords(text, healingWords)
  }

  /* --- TEMPERATURE & HEAT UPDATES --- */
  if (!state.cooldownMode) {
    const heatImpact = isPlayerTurn ? state.playerIncreaseHeatImpact : state.modelIncreaseHeatImpact
    const tempImpact = isPlayerTurn ? state.playerIncreaseTemperatureImpact : state.modelIncreaseTemperatureImpact
    const heatDecrease = isPlayerTurn ? state.playerDecreaseHeatImpact : state.modelDecreaseHeatImpact
    const tempDecrease = isPlayerTurn ? state.playerDecreaseTemperatureImpact : state.modelDecreaseTemperatureImpact
    const tempThresh = isPlayerTurn ? state.threshholdPlayerIncreaseTemperature : state.threshholdModelIncreaseTemperature
    const calmThresh = isPlayerTurn ? state.threshholdPlayerDecreaseTemperature : state.threshholdModelDecreaseTemperature

    // Grace period limits temperature
    const maxAllowedTemp = state.gracePeriodActive ? state.gracePeriodMaxTemperature : state.trueMaximumTemperature

    if (conflictCount > 0) {
      state.heat += conflictCount * heatImpact
      if (conflictCount >= tempThresh && state.storyTemperature < maxAllowedTemp) {
        state.storyTemperature += tempImpact
        log(`Detected ${conflictCount} conflict words. Increasing heat & temperature.`)
      } else {
        log(`Detected ${conflictCount} conflict words. Increasing heat.`)
      }
    }

    if (calmingCount > 0) {
      state.heat -= calmingCount * heatDecrease
      if (calmingCount >= calmThresh) {
        state.storyTemperature -= tempDecrease
        log(`Detected ${calmingCount} calming words. Decreasing heat & temperature.`)
      } else {
        log(`Detected ${calmingCount} calming words. Decreasing heat.`)
      }
    }
  }

  /* --- HP SYSTEM UPDATES --- */
  if (state.enableHPSystem) {
    const injuryImpact = isPlayerTurn ? state.playerInjuryImpact : state.modelInjuryImpact
    const healImpact = isPlayerTurn ? state.playerHealingImpact : state.modelHealingImpact
    const injuryThresh = isPlayerTurn ? state.threshholdPlayerInjury : state.threshholdModelInjury
    const healThresh = isPlayerTurn ? state.threshholdPlayerHealing : state.threshholdModelHealing

    if (injuryCount >= injuryThresh && !state.gracePeriodPreventsInjury) {
      const damage = injuryCount * injuryImpact
      state.hp -= damage
      log(`Detected ${injuryCount} injury words. HP reduced by ${damage}. Current HP: ${state.hp}`)
    }

    if (healingCount >= healThresh) {
      const healing = healingCount * healImpact
      state.hp += healing
      log(`Detected ${healingCount} healing words. HP increased by ${healing}. Current HP: ${state.hp}`)
    }

    // Clamp HP
    state.hp = Math.max(0, Math.min(state.hp, state.maximumHP))
  }

  /* --- SP SYSTEM UPDATES --- */
  if (state.enableSPSystem) {
    const sanityLossImpact = isPlayerTurn ? state.playerSanityLossImpact : state.modelSanityLossImpact
    const sanityGainImpact = isPlayerTurn ? state.playerSanityGainImpact : state.modelSanityGainImpact
    const sanityLossThresh = isPlayerTurn ? state.threshholdPlayerSanityLoss : state.threshholdModelSanityLoss
    const sanityGainThresh = isPlayerTurn ? state.threshholdPlayerSanityGain : state.threshholdModelSanityGain

    if (dreadCount >= sanityLossThresh && !state.gracePeriodPreventsSanityLoss) {
      const sanityLoss = dreadCount * sanityLossImpact
      state.sp -= sanityLoss
      log(`Detected ${dreadCount} dread words. SP reduced by ${sanityLoss}. Current SP: ${state.sp}`)
    }

    if (rationalityCount >= sanityGainThresh) {
      const sanityGain = rationalityCount * sanityGainImpact
      state.sp += sanityGain
      log(`Detected ${rationalityCount} rationality words. SP increased by ${sanityGain}. Current SP: ${state.sp}`)
    }

    // Clamp SP
    state.sp = Math.max(0, Math.min(state.sp, state.maximumSP))
  }

  /* --- RANDOM EXPLOSION EVENT --- */
  const explosionRoll = randomint(1, 100)
  if (explosionRoll <= state.randomExplosionChance && !state.gracePeriodActive) {
    state.heat += state.randomExplosionHeatIncreaseValue
    state.storyTemperature += state.randomExplosionTemperatureIncreaseValue
    log(`!WARNING! Explosion occurred! (+${state.randomExplosionHeatIncreaseValue} heat) (+${state.randomExplosionTemperatureIncreaseValue} temperature)`)
  }

  /* --- BONEPOKE EVENTS --- */
  let bonepokeResult = "None"
  if (state.enableBonepokeSystem) {
    bonepokeResult = getRankedTones(text, bonepoke)

    if (randomint(1, 100) <= state.randomExplosionChance && !state.gracePeriodActive) {
      if (bonepokeResult.includes("shear")) {
        state.heat += 8
        state.storyTemperature += 3
        if (state.enableSPSystem) state.sp -= 10
        log("!BONEPOKE EVENT! Reality Fracture Occurred!")
      } else if (bonepokeResult.includes("drop")) {
        state.heat += 5
        state.storyTemperature += 2
        if (state.enableSPSystem) state.sp -= 8
        log("!BONEPOKE EVENT! Traumatic Flashback Occurred!")
      }
    }

    // Bonepoke modifiers
    if (bonepokeResult.includes("lift")) {
      state.temperatureIncreaseChance = Math.min(state.temperatureIncreaseChance + 2, 25)
    } else {
      state.temperatureIncreaseChance = 15
    }

    if (bonepokeResult.includes("drop") && state.overheatMode) {
      state.overheatTurnsLeft++
      log("!BONEPOKE GOVERNOR! Emotional climax extended.")
    }
  }

  /* --- HEAT TO TEMPERATURE CONVERSION --- */
  if (!state.cooldownMode && !state.overheatMode) {
    state.heat += state.heatIncreaseValue

    const heatRoll = randomint(1, state.temperatureIncreaseChance)
    if (heatRoll <= state.heat) {
      state.heat = 0

      const maxAllowedTemp = state.gracePeriodActive ? state.gracePeriodMaxTemperature : state.trueMaximumTemperature
      if (state.storyTemperature < maxAllowedTemp) {
        state.storyTemperature += state.temperatureIncreaseValue
        log(`Temperature increased. Temperature is now ${state.storyTemperature}`)
      }
    }
  }

  /* --- OVERHEAT/COOLDOWN STATE MACHINE --- */
  if (state.storyTemperature >= state.maximumTemperature && !state.cooldownMode && !state.overheatMode) {
    state.overheatMode = true
    state.overheatTurnsLeft = state.overheatTimer
    log("Overheat Mode Activated")
  }

  if (state.cooldownMode) {
    state.cooldownTurnsLeft--
    state.storyTemperature -= state.cooldownRate
    log(`Cooldown Timer: ${state.cooldownTurnsLeft}`)

    if (state.cooldownTurnsLeft <= 0) {
      state.cooldownMode = false
      log("Cooldown Mode Disabled")
    }
  } else if (state.overheatMode) {
    state.overheatTurnsLeft--
    log(`Overheat Timer: ${state.overheatTurnsLeft}`)

    if (state.overheatTurnsLeft <= 0) {
      state.storyTemperature -= state.overheatReductionForTemperature
      state.heat -= state.overheatReductionForHeat
      state.overheatMode = false
      state.cooldownMode = true
      state.cooldownTurnsLeft = state.cooldownTimer
      log("Cooldown Mode Activated")
    }
  }

  /* --- TEMPERATURE CLAMPING --- */
  state.storyTemperature = Math.max(
    state.trueMinimumTemperature,
    Math.min(state.storyTemperature, state.trueMaximumTemperature)
  )

  /* --- GENRE/THEME/STYLE DETECTION --- */
  let genre = "None"
  let theme = "None"
  let style = "None"
  let directive = "Focus on establishing the scene and character motivations."

  if (state.enableGenreDetection && !state.gracePeriodActive) {
    genre = getRankedTones(text, genres)
    if (genre === "None") genre = "Noir-Detective(P)"

    theme = getRankedTones(text, themes)
    if (theme === "None") theme = "Forbidden-Knowledge(P)"

    style = getRankedTones(text, styles)
    if (style === "None") style = "Atmospheric-Dread(P)"

    // Bonepoke directives
    const directiveDescriptions = {
      shear: "a rupture in reality (impossible geometry, sensory wrongness)",
      drop: "internal dread (a recursive memory, psychological horror)",
      invert: "a contradiction (a betrayal, a revealed lie, an inverted truth)",
      lift: "the cost of knowledge (the physical or mental price of discovery)"
    }

    if (bonepokeResult !== "None") {
      const primary = bonepokeResult.match(/(\w+)\(P\)/)
      const secondary = bonepokeResult.match(/(\w+)\(S\)/)
      const p_text = primary ? directiveDescriptions[primary[1]] : ""
      const s_text = secondary ? directiveDescriptions[secondary[1]] : ""

      if (p_text && s_text) {
        directive = `Focus primarily on ${p_text}, with a secondary emphasis on ${s_text}.`
      } else if (p_text) {
        directive = `The primary focus should be ${p_text}.`
      }
    }
  }

  /* --- CONTEXT INJECTION (LOCATION LORE) --- */
  let context = "No-Data"
  if (state.enableLocationTracking) {
    const loreLibrary = typeof state.loreData !== 'undefined' ? state.loreData : undefined

    if (loreLibrary && loreLibrary.locations && loreLibrary.locations[state.currentLocation]) {
      const currentLocationData = loreLibrary.locations[state.currentLocation]
      let brief = `Loc:${state.currentLocation}`

      if (currentLocationData.parent) {
        brief += `(${currentLocationData.parent})`
      }

      if (currentLocationData.hub) {
        brief += `. Hub:${currentLocationData.hub}`
      }

      if (currentLocationData.threat && !state.gracePeriodActive) {
        brief += `. Threat:${currentLocationData.threat}`
      }

      if (currentLocationData.adjacent && currentLocationData.adjacent.length > 0) {
        brief += `. Nearby:${currentLocationData.adjacent.join(',')}`
      }

      context = brief
    }
  }

  /* --- HP STATUS EFFECTS --- */
  let hpStatus = ""
  if (state.enableHPSystem && state.hp < state.maximumHP) {
    if (state.hp <= state.hpCriticalThreshold) {
      hpStatus = " [HP:CRITICAL-Physical actions severely compromised, weakness overwhelming]"

      // Whip-poor-will stalking
      if (state.enableWhippoorwill && !state.gracePeriodActive) {
        const whippoorwillRoll = randomint(1, 100)
        if (whippoorwillRoll <= (state.whippoorwillActivationThreshold * state.whippoorwillIntensityMultiplier)) {
          hpStatus += ` ${randomChoice(whippoorwillDescriptions)}`
        }
      }
    } else if (state.hp <= state.hpLowThreshold) {
      hpStatus = " [HP:LOW-Physical activities difficult, movement labored]"
    } else if (state.hp <= state.hpInjuredThreshold) {
      hpStatus = " [HP:INJURED-Physical capabilities somewhat reduced]"
    }
  }

  /* --- SP STATUS EFFECTS --- */
  let spStatus = ""
  if (state.enableSPSystem && state.sp < state.maximumSP) {
    if (state.sp <= state.spCriticalThreshold && !state.gracePeriodActive) {
      spStatus = " [SP:CRITICAL-Reality fragmenting, sanity barely maintained]"

      // Hallucinations and delusions
      const hallucinationRoll = randomint(1, 100)
      if (hallucinationRoll <= state.hallucinationChance) {
        spStatus += ` HALLUCINATION: ${randomChoice(hallucinationTemplates)}`
      }

      const delusionRoll = randomint(1, 100)
      if (delusionRoll <= state.delusionChance) {
        const delusions = [
          "A creeping certainty that everyone is in on a conspiracy against you.",
          "The unshakable belief that you've lived this moment before, but it ended in horror.",
          "A conviction that you are being replaced, piece by piece, by something else.",
          "The feeling that your thoughts are not your own—something is thinking through you.",
          "An irrational certainty that time is running backwards.",
          "The belief that you have already died and this is the afterlife.",
          "A conviction that nothing around you is real—that you're still asleep.",
          "The certainty that you can see the future, but only the terrible parts."
        ]
        spStatus += ` DELUSION: ${randomChoice(delusions)}`
      }
    } else if (state.sp <= state.spUnstableThreshold) {
      spStatus = " [SP:UNSTABLE-Reality feels thin, concentration difficult]"
    } else if (state.sp <= state.spShakenThreshold) {
      spStatus = " [SP:SHAKEN-Nerves frayed, unease pervasive]"
    }
  }

  /* --- BUILD AUTHORS NOTE --- */
  let phase = ""

  // Grace period overrides
  if (state.gracePeriodActive) {
    phase = `Introduction. Establish the scene peacefully. No horror, violence, or dread should appear. ${state.gracePeriodTurnsLeft} turns of grace remaining.`
  } else if (state.cooldownMode === false) {
    // Normal temperature phases
    if (state.storyTemperature === 1) {
      phase = "Introduction. Introduce characters and locations. There should be no conflict or tension in the story."
    } else if (state.storyTemperature === 2) {
      phase = "Introduction. Introduce characters, locations, and plot hooks. There should be only a little conflict and tension in the story unless the player is seeking it out."
    } else if (state.storyTemperature === 3) {
      phase = "Introduction. Introduce characters, locations, and plot hooks. There should be only minor conflicts. Introduce the possibility of a moderate conflict that could appear far in the future."
    } else if (state.storyTemperature === 4) {
      phase = "Introduction. Introduce characters, locations, and plot hooks. There should be only minor conflicts. Introduce the possibility of a moderate conflict that could appear far in the future."
    } else if (state.storyTemperature === 5) {
      phase = "Rising Action. Introduce more minor conflicts. Give minor hints as to what a greater conflict in the far future could be."
    } else if (state.storyTemperature === 6) {
      phase = "Rising Action. Introduce the occasional moderate conflict. Give minor hints as to what a greater conflict in the far future could be."
    } else if (state.storyTemperature === 7) {
      phase = "Rising Action. Introduce the occasional moderate conflict. Give minor hints as to what a greater conflict in the far future could be. Introduce connections to discovered plot hooks."
    } else if (state.storyTemperature === 8) {
      phase = "Rising Action. Introduce the occasional moderate conflict. Give moderate hints as to what a greater conflict in the far future could be. Introduce connections to discovered plot hooks."
    } else if (state.storyTemperature === 9) {
      phase = "Rising Action. Introduce the occasional moderate conflict. Give moderate hints as to what a greater conflict in the far future could be. Introduce connections to discovered plot hooks. Begin moving the story towards the greater conflict ahead."
    } else if (state.storyTemperature === 10) {
      phase = "Climax. Introduce the climax of the story. All previous hints about this greater conflict should intersect with this climactic moment. Plot hooks should be connected to this climax. Emphasize major conflict."
    } else if (state.storyTemperature === 11) {
      phase = "Climax. Plot hooks should be connected to this climax. Emphasize major conflict. Push the characters near their limits while staying fair."
    } else if (state.storyTemperature === 12) {
      phase = "Climax. Advance the climax of the story, introduce a challenge to go with it. Emphasize major conflict. Push the characters near their limits while staying fair."
    } else if (state.storyTemperature === 13) {
      phase = "Climax. Advance the climax of the story, introduce challenges to go with it. Emphasize major conflict. Push the characters to their limits. Punish terrible decisions with an appropriate story response."
    } else if (state.storyTemperature === 14) {
      phase = "Climax. Advance the climax of the story. Emphasize major conflict. Push the characters to their limits. Punish bad decisions while not being unfair."
    } else if (state.storyTemperature >= 15) {
      phase = "Ultimate Climax. Emphasize incredibly difficult conflict. Push the characters to their absolute limits. Punish bad decisions that the characters make. Be unfair at times, but make unfairness in the story make sense with the current plot."
    }
  } else {
    // Cooldown phases
    if (state.storyTemperature <= 1) {
      state.cooldownMode = false
    } else if (state.storyTemperature === 2) {
      phase = "Downtime. There should be only small bits of tension, with most of the current story being filled with peace and quiet."
    } else if (state.storyTemperature === 3) {
      phase = "Downtime. There should be only minor tension, with most of the current story being filled with peace and quiet."
    } else if (state.storyTemperature === 4) {
      phase = "Downtime. There should be only minor tension, with most of the current story being filled with peaceful encounters."
    } else if (state.storyTemperature === 5) {
      phase = "Downtime. There should be only minor tension, with most of the current story being filled with peaceful encounters, unless characters actively try to cause chaos."
    } else if (state.storyTemperature === 6) {
      phase = "Downtime. There should be only minor tension and conflict, with most of the current story being filled with peaceful encounters, unless characters actively try to cause chaos."
    } else if (state.storyTemperature === 7) {
      phase = "Downtime. There should be only minor tension and conflict, with most of the current story being filled with neutral encounters, unless characters actively try to cause chaos."
    } else if (state.storyTemperature === 8) {
      phase = "Downtime. There should be only minor tension and conflict, with most of the current story containing neutral encounters and minor surprises. This section of story should have a satisfying conclusion for its characters."
    } else if (state.storyTemperature === 9) {
      phase = "Falling Action. The conflicts should be quickly ending, and this section of story should have a satisfying conclusion for its characters. There is still some minor tension and conflict."
    } else if (state.storyTemperature === 10) {
      phase = "Falling Action. The conflicts should be slowly ending, and this section of story should have a satisfying conclusion for its characters. There is still some moderate tension and conflict."
    } else if (state.storyTemperature === 11) {
      phase = "Falling Action. The conflicts should be slowly ending, and this section of story should have a satisfying conclusion for its characters. There is still moderate tension and conflict, but not as much as before."
    } else if (state.storyTemperature === 12) {
      phase = "Falling Action. The conflicts should be slowly ending, and this section of story should have a satisfying conclusion for its characters. There is still moderately high tension and conflict, but not as much as before."
    } else if (state.storyTemperature === 13) {
      phase = "Falling Action. The conflicts should be slowly ending. There is still moderately high tension and conflict, but not as much as before."
    } else if (state.storyTemperature === 14) {
      phase = "Falling Action. The conflicts should be beginning to come to a close. There is still moderately high tension and conflict, but not as much as before."
    } else if (state.storyTemperature >= 15) {
      phase = "Extreme Falling Action. The conflicts should start to show signs of ending. Tension and conflict is still high."
    }
  }

  // Assemble author's note
  const currentUserNote = extractUserAuthorsNote(state.memory.authorsNote)
  const userNoteSection = currentUserNote ? " --- " + currentUserNote : ""

  let finalNote = ""

  if (state.enableGenreDetection && !state.gracePeriodActive) {
    finalNote = `[Phase:${phase}] [Genre:${genre}] [Theme:${theme}] [Style:${style}] [Directive:${directive}] [Context:${context}]${hpStatus}${spStatus}`
  } else {
    finalNote = `Story Phase: ${phase}${hpStatus}${spStatus}`
  }

  state.memory.authorsNote = finalNote + userNoteSection

  // Lock author's note for AI responses
  if (isPlayerTurn) {
    state.lockedAuthorsNote = state.memory.authorsNote
    state.authorsNoteLockCounter = state.authorsNoteLockDuration
  }

  /* --- LOGGING --- */
  let statusLog = `Turn:${state.turnCount} | Heat:${state.heat} | Temp:${state.storyTemperature}`
  if (state.enableHPSystem) statusLog += ` | HP:${state.hp}`
  if (state.enableSPSystem) statusLog += ` | SP:${state.sp}`
  if (state.gracePeriodActive) statusLog += ` | Grace:${state.gracePeriodTurnsLeft}`
  log(statusLog)

  return { text }
}

// Don't modify this part
modifier(text)
