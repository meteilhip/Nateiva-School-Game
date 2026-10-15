import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import AudioManager from '../audio/AudioManager';
import { TutorMode } from '../games/types';

export type TutorSubjectCategory = 
  | 'ADDITION'
  | 'SUBTRACTION'
  | 'MULTIPLICATION'
  | 'DIVISION'
  | 'FRACTIONS'
  | 'SHAPES'
  | 'READING'
  | 'COMPREHENSION'
  | 'SCIENCE';

interface TutorOverlayProps {
  question: any;
  onClose: () => void;
  onPracticeSimilar?: () => void;
}

export function TutorOverlay({ question, onClose, onPracticeSimilar }: TutorOverlayProps) {
  // Detect primary category from question
  const detectInitialCategory = (): TutorSubjectCategory => {
    const type = (question.type || '').toUpperCase();
    const qText = (question.q || '').toUpperCase();

    if (type.includes('SUB') || qText.includes('MOINS') || qText.includes('-')) return 'SUBTRACTION';
    if (type.includes('MULT') || qText.includes('FOIS') || qText.includes('×') || qText.includes('*')) return 'MULTIPLICATION';
    if (type.includes('DIV') || qText.includes('DIVIS') || qText.includes('PARTAGE')) return 'DIVISION';
    if (type.includes('FRACT') || qText.includes('1/2') || qText.includes('FRACTION')) return 'FRACTIONS';
    if (type.includes('SHAPE') || type.includes('GEO') || qText.includes('FORME') || qText.includes('CERCLE') || qText.includes('TRIANGLE')) return 'SHAPES';
    if (type.includes('STORY') || type.includes('COMPREHENSION') || type.includes('MYSTERY') || type.includes('PUPPET')) return 'COMPREHENSION';
    if (type.includes('SCI') || type.includes('GARDEN') || type.includes('PLANT') || type.includes('HABITAT') || type.includes('WATER_CYCLE') || type.includes('LIVING')) return 'SCIENCE';
    if (type.includes('LETTER') || type.includes('PHON') || type.includes('SYLLABLE') || type.includes('SPELL') || type.includes('READ')) return 'READING';
    return 'ADDITION';
  };

  const [activeCategory, setActiveCategory] = useState<TutorSubjectCategory>(detectInitialCategory());
  const [activeMode, setActiveMode] = useState<TutorMode>('WATCH_ME');
  const [regroupStep, setRegroupStep] = useState<number>(0);
  const [isSlowSpeech, setIsSlowSpeech] = useState(false);

  // Subtraction state
  const [subCrossed, setSubCrossed] = useState<number[]>([0, 1, 2]);

  // Multiplication state
  const [highlightedRow, setHighlightedRow] = useState<number>(0);

  // Division state
  const [basketDistribution, setBasketDistribution] = useState<number[]>([4, 4, 4]);

  // Fractions state
  const [fractionSlices, setFractionSlices] = useState<boolean[]>([true, true, true, false]);

  // Shapes state
  const [tappedVertices, setTappedVertices] = useState<number[]>([0, 1]);

  // Reading state
  const [tappedSyllables, setTappedSyllables] = useState<number[]>([]);

  // Comprehension state
  const [storyOrder, setStoryOrder] = useState<number[]>([]);

  // Science state
  const [hasSun, setHasSun] = useState<boolean>(true);
  const [hasWater, setHasWater] = useState<boolean>(true);
  const [hasSoil, setHasSoil] = useState<boolean>(true);

  const speak = (text: string) => {
    AudioManager.play({ 
      text, 
      contentId: 'tutor_speech',
      rate: isSlowSpeech ? 0.65 : 0.85 
    });
  };

  useEffect(() => {
    speakIntro(activeCategory);
    return () => {
      AudioManager.onTutorToggle();
    };
  }, [activeCategory]);

  const speakIntro = (cat: TutorSubjectCategory) => {
    switch (cat) {
      case 'ADDITION':
        speak('Bonjour ! Je suis ton tuteur malin. Regarde bien comment assembler les barres de dix et les cubes.');
        break;
      case 'SUBTRACTION':
        speak('La soustraction, c\'est retirer ou barrer des objets pour trouver ce qu\'il reste.');
        break;
      case 'MULTIPLICATION':
        speak('La multiplication, c\'est ranger des objets en rangées égales. Trois rangées de quatre font douze !');
        break;
      case 'DIVISION':
        speak('La division, c\'est partager équitablement dans chaque panier pour que tout le monde ait la même part.');
        break;
      case 'FRACTIONS':
        speak('Une fraction, c\'est couper un gâteau en parts exactement égales.');
        break;
      case 'SHAPES':
        speak('Comptons les côtés et les sommets des formes géométriques !');
        break;
      case 'READING':
        speak('Écoute les sons et touche chaque syllabe pour assembler le mot magique.');
        break;
      case 'COMPREHENSION':
        speak('Remets les trois images dans l\'ordre de l\'histoire : le début, le milieu et la fin !');
        break;
      case 'SCIENCE':
        speak('Expérience scientifique : active le soleil, l\'eau et la terre pour voir grandir la plante.');
        break;
    }
  };

  // 1. ADDITION & REGROUPING (5 Modes: WATCH_ME, LETS_DO_IT, YOUR_TURN, ANOTHER_WAY, WHY_IT_WORKS)
  const renderAddition = () => (
    <View style={styles.modelContainer}>
      <Text style={styles.stepHeader}>➕ Addition & Dizaines (Base 10)</Text>

      {/* 5 Pedagogical Mode Selector Tabs */}
      <View style={styles.modeTabsRow}>
        <TouchableOpacity 
          style={[styles.modeTab, activeMode === 'WATCH_ME' && styles.modeTabActive]} 
          onPress={() => { setActiveMode('WATCH_ME'); speak('Regarde bien la démonstration des barres de dix et des petits cubes.'); }}
        >
          <Text style={[styles.modeTabText, activeMode === 'WATCH_ME' && styles.modeTabTextActive]}>👀 Démo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeTab, activeMode === 'LETS_DO_IT' && styles.modeTabActive]} 
          onPress={() => { setActiveMode('LETS_DO_IT'); speak('À toi de jouer : touche pour fusionner les 10 cubes en une barre de dix.'); }}
        >
          <Text style={[styles.modeTabText, activeMode === 'LETS_DO_IT' && styles.modeTabTextActive]}>🤝 Ensemble</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeTab, activeMode === 'YOUR_TURN' && styles.modeTabActive]} 
          onPress={() => { setActiveMode('YOUR_TURN'); speak('À ton tour maintenant ! Résous ce problème tout seul.'); }}
        >
          <Text style={[styles.modeTabText, activeMode === 'YOUR_TURN' && styles.modeTabTextActive]}>🎯 À ton tour</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeTab, activeMode === 'ANOTHER_WAY' && styles.modeTabActive]} 
          onPress={() => { setActiveMode('ANOTHER_WAY'); speak('Voici l\'astuce magique des amis de dix.'); }}
        >
          <Text style={[styles.modeTabText, activeMode === 'ANOTHER_WAY' && styles.modeTabTextActive]}>✨ Astuce</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeTab, activeMode === 'WHY_IT_WORKS' && styles.modeTabActive]} 
          onPress={() => { setActiveMode('WHY_IT_WORKS'); speak('Pourquoi ça marche ? C\'est le principe de la base dix.'); }}
        >
          <Text style={[styles.modeTabText, activeMode === 'WHY_IT_WORKS' && styles.modeTabTextActive]}>🧠 Pourquoi ?</Text>
        </TouchableOpacity>
      </View>

      {activeMode === 'WATCH_ME' && (
        <View style={styles.subModelCard}>
          <Text style={styles.modeCardHeader}>Exemple concret : 47 + 28</Text>
          <View style={styles.concreteBlocksRow}>
            <View style={styles.numberDecomp}>
              <Text style={styles.numberDecompLabel}>47</Text>
              <View style={styles.rodsContainer}>
                {Array.from({ length: 4 }).map((_, i) => <View key={i} style={styles.tenRodVisual} />)}
                <View style={styles.cubesGrid}>
                  {Array.from({ length: 7 }).map((_, i) => <View key={i} style={styles.unitCubeVisual} />)}
                </View>
              </View>
              <Text style={styles.decompText}>4 dizaines + 7 unités</Text>
            </View>

            <Text style={styles.bigSymbol}>➕</Text>

            <View style={styles.numberDecomp}>
              <Text style={styles.numberDecompLabel}>28</Text>
              <View style={styles.rodsContainer}>
                {Array.from({ length: 2 }).map((_, i) => <View key={i} style={styles.tenRodVisual} />)}
                <View style={styles.cubesGrid}>
                  {Array.from({ length: 8 }).map((_, i) => <View key={i} style={styles.unitCubeVisual} />)}
                </View>
              </View>
              <Text style={styles.decompText}>2 dizaines + 8 unités</Text>
            </View>
          </View>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>Étape 1 : On rassemble les unités</Text>
            <Text style={styles.explanationDesc}>
              7 unités + 8 unités = 15 unités. On échange 10 unités contre 1 NOUVELLE barre de dix. Il reste 5 unités !
              Dizaines : 4 + 2 + 1 (retenue) = 7. Total = <Text style={{ fontWeight: 'bold', color: '#16A34A' }}>75</Text> !
            </Text>
          </View>
        </View>
      )}

      {activeMode === 'LETS_DO_IT' && (
        <View style={styles.subModelCard}>
          <Text style={styles.modeCardHeader}>Interactive : Fabrique la dizaine !</Text>
          <Text style={styles.subtext}>Touche les 10 cubes pour les transformer en barre de dix :</Text>

          <View style={styles.interactiveRegroupArea}>
            {regroupStep === 0 ? (
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity 
                  style={styles.fusionButton} 
                  onPress={() => {
                    setRegroupStep(1);
                    speak('Bravo ! Tu as fusionné 10 cubes pour former 1 nouvelle barre de dix !');
                  }}
                >
                  <Text style={{ fontSize: 36 }}>📦 10 Petits Cubes</Text>
                  <Text style={styles.fusionBtnText}>⚡ Toucher pour Fusionner !</Text>
                </TouchableOpacity>
                <View style={styles.pointerGuideRow}>
                  <Text style={{ fontSize: 20 }}>👆</Text>
                  <Text style={styles.pointerGuideText}>Touche ici !</Text>
                </View>
              </View>
            ) : (
              <View style={styles.fusedResultBox}>
                <Text style={{ fontSize: 34 }}>🟦 1 Nouvelle Barre de 10 !</Text>
                <Text style={styles.fusedResultText}>+ 5 petits cubes restants = 15 unités</Text>
              </View>
            )}
          </View>

          <Text style={styles.finalTotalBig}>
            Total dizaines : 4 + 2 + 1 = 7 dizaines. Résultat final = <Text style={{ color: '#16A34A' }}>75</Text> !
          </Text>
        </View>
      )}

      {activeMode === 'YOUR_TURN' && (
        <View style={styles.subModelCard}>
          <Text style={styles.modeCardHeader}>Défi de Transfert Indépendant : 36 + 19</Text>
          <Text style={styles.subtext}>Résous ce problème similaire avec de nouveaux nombres :</Text>
          <View style={styles.concreteBlocksRow}>
            <View style={styles.numberDecomp}>
              <Text style={styles.numberDecompLabel}>36</Text>
              <Text style={styles.decompText}>3 barres + 6 cubes</Text>
            </View>
            <Text style={styles.bigSymbol}>➕</Text>
            <View style={styles.numberDecomp}>
              <Text style={styles.numberDecompLabel}>19</Text>
              <Text style={styles.decompText}>1 barre + 9 cubes</Text>
            </View>
          </View>
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>🎯 Indice mental :</Text>
            <Text style={styles.explanationDesc}>
              6 + 9 = 15. On retient 1 dizaine, il reste 5 unités. Dizaines : 3 + 1 + 1 = 5. Total = 55 !
            </Text>
          </View>
        </View>
      )}

      {activeMode === 'ANOTHER_WAY' && (
        <View style={styles.subModelCard}>
          <Text style={styles.modeCardHeader}>L'Astuce des Amis de Dix :</Text>
          <View style={styles.trickBox}>
            <Text style={styles.trickTitle}>47 + 3 = 50 (Nombre rond !)</Text>
            <Text style={styles.trickText}>Il reste 25 à ajouter (28 - 3 = 25)</Text>
            <Text style={[styles.trickTitle, { color: '#16A34A', marginTop: 4 }]}>50 + 25 = 75 ! 🚀</Text>
          </View>
        </View>
      )}

      {activeMode === 'WHY_IT_WORKS' && (
        <View style={styles.subModelCard}>
          <Text style={styles.modeCardHeader}>Le Principe de la Base 10 :</Text>
          <Text style={styles.explanationDesc}>
            Notre système de numération ne peut garder que des chiffres de 0 à 9 par colonne. Dès qu'on a 10 unités, elles se regroupent en 1 dizaine !
          </Text>
        </View>
      )}
    </View>
  );

  // 2. SUBTRACTION (Taking away & Cross-out)
  const renderSubtraction = () => {
    const totalItems = 7;
    const crossedCount = subCrossed.length;
    const remainder = totalItems - crossedCount;

    return (
      <View style={styles.modelContainer}>
        <Text style={styles.stepHeader}>➖ Soustraction Visuelle : 7 - {crossedCount} = {remainder}</Text>
        <Text style={styles.subtext}>Touche les objets pour les barrer ou les remettre :</Text>

        <View style={styles.interactiveItemsRow}>
          {Array.from({ length: totalItems }).map((_, i) => {
            const isCrossed = subCrossed.includes(i);
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                style={[styles.subItemBox, isCrossed && styles.subItemBoxCrossed]}
                onPress={() => {
                  if (isCrossed) {
                    setSubCrossed(subCrossed.filter(idx => idx !== i));
                  } else {
                    setSubCrossed([...subCrossed, i]);
                  }
                  speak(`Il reste ${totalItems - (isCrossed ? subCrossed.length - 1 : subCrossed.length + 1)} mangues.`);
                }}
              >
                <Text style={{ fontSize: 32 }}>🥭</Text>
                {isCrossed && <Text style={styles.crossOverlay}>❌</Text>}
                <Text style={styles.subItemIndex}>{i + 1}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.mathSummaryBox}>
          <Text style={styles.mathSummaryText}>
            Au départ : <Text style={{ color: '#2563EB' }}>7</Text> mangues | 
            Barrées : <Text style={{ color: '#DC2626' }}>{crossedCount}</Text> ❌ | 
            Restantes : <Text style={{ color: '#16A34A', fontWeight: 'bold' }}>{remainder}</Text> ✅
          </Text>
        </View>

        <View style={styles.trickBox}>
          <Text style={styles.trickTitle}>💡 Astuce du Hibou :</Text>
          <Text style={styles.trickText}>
            Pour soustraire, recule sur la frise numérique ou barre les objets retirés un par un !
          </Text>
        </View>
      </View>
    );
  };

  // 3. MULTIPLICATION (Equal groups & Arrays)
  const renderMultiplication = () => {
    const rows = 3;
    const cols = 4;
    const total = rows * cols;

    return (
      <View style={styles.modelContainer}>
        <Text style={styles.stepHeader}>✖️ Multiplication en Grille : 3 × 4 = {total}</Text>
        <Text style={styles.subtext}>Touche une rangée pour écouter l'addition répétée :</Text>

        <View style={styles.arrayGridBox}>
          {Array.from({ length: rows }).map((_, r) => {
            const isHighlight = highlightedRow === r;
            return (
              <TouchableOpacity
                key={r}
                activeOpacity={0.8}
                style={[styles.arrayRow, isHighlight && styles.arrayRowHighlight]}
                onPress={() => {
                  setHighlightedRow(r);
                  speak(`Rangée numéro ${r + 1} : quatre étoiles. Total : ${(r + 1) * 4} étoiles.`);
                }}
              >
                <Text style={styles.rowLabelText}>Rangée {r + 1} ➡️</Text>
                <View style={styles.rowStarsRow}>
                  {Array.from({ length: cols }).map((_, c) => (
                    <Text key={c} style={{ fontSize: 24, marginHorizontal: 2 }}>⭐</Text>
                  ))}
                </View>
                <Text style={styles.rowTotalBadge}>= 4</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.mathSummaryBox}>
          <Text style={styles.mathSummaryText}>
            4 + 4 + 4 = <Text style={{ color: '#16A34A', fontWeight: 'bold' }}>12</Text> (C'est 3 paquets de 4 !)
          </Text>
        </View>

        <View style={styles.trickBox}>
          <Text style={styles.trickTitle}>💡 Astuce Magique :</Text>
          <Text style={styles.trickText}>
            La multiplication va dans les deux sens : 3 × 4 = 12 et 4 × 3 = 12 ! Tu peux tourner la grille !
          </Text>
        </View>
      </View>
    );
  };

  // 4. DIVISION (Fair sharing into baskets)
  const renderDivision = () => {
    const totalFish = 12;
    const basketCount = 3;
    const perBasket = totalFish / basketCount;

    return (
      <View style={styles.modelContainer}>
        <Text style={styles.stepHeader}>➗ Partage Équitable : 12 ÷ 3 = {perBasket}</Text>
        <Text style={styles.subtext}>12 poissons frais partagés entre 3 paniers de pêche :</Text>

        <View style={styles.basketsRow}>
          {basketDistribution.map((count, idx) => (
            <View key={idx} style={styles.basketCard}>
              <Text style={{ fontSize: 30 }}>🧺</Text>
              <Text style={styles.basketTitle}>Panier {idx + 1}</Text>
              <View style={styles.fishInBasketGrid}>
                {Array.from({ length: count }).map((_, f) => (
                  <Text key={f} style={{ fontSize: 18 }}>🐟</Text>
                ))}
              </View>
              <Text style={styles.basketCountBadge}>{count} poissons</Text>
            </View>
          ))}
        </View>

        <View style={styles.mathSummaryBox}>
          <Text style={styles.mathSummaryText}>
            Chaque panier a exactement <Text style={{ color: '#16A34A', fontWeight: 'bold' }}>{perBasket} poissons</Text>. Rien ne reste de côté !
          </Text>
        </View>

        <View style={styles.trickBox}>
          <Text style={styles.trickTitle}>💡 Règle d'or :</Text>
          <Text style={styles.trickText}>
            Tout le monde doit recevoir la même part sans dispute. Diviser est l'inverse de multiplier !
          </Text>
        </View>
      </View>
    );
  };

  // 5. FRACTIONS (Pizza / Bar slices)
  const renderFractions = () => {
    const activeSlices = fractionSlices.filter(Boolean).length;
    const totalSlices = fractionSlices.length;

    return (
      <View style={styles.modelContainer}>
        <Text style={styles.stepHeader}>🍕 Fractions : {activeSlices} / {totalSlices}</Text>
        <Text style={styles.subtext}>Touche chaque part pour la manger ou la remettre :</Text>

        <View style={styles.fractionPizzaRow}>
          {fractionSlices.map((filled, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.7}
              style={[styles.fractionSliceBox, filled && styles.fractionSliceFilled]}
              onPress={() => {
                const updated = [...fractionSlices];
                updated[idx] = !updated[idx];
                setFractionSlices(updated);
                const count = updated.filter(Boolean).length;
                speak(`${count} part sur ${totalSlices} sélectionnée.`);
              }}
            >
              <Text style={{ fontSize: 30 }}>{filled ? '🍕' : '⚪'}</Text>
              <Text style={styles.sliceNumberText}>Part {idx + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mathSummaryBox}>
          <Text style={styles.fractionNotationBig}>
            <Text style={{ color: '#2563EB' }}>{activeSlices}</Text> / <Text style={{ color: '#EA580C' }}>{totalSlices}</Text>
          </Text>
          <Text style={styles.fractionExplainSub}>
            Numérateur (haut) = parts prises | Dénominateur (bas) = parts totales
          </Text>
        </View>

        <View style={styles.trickBox}>
          <Text style={styles.trickTitle}>💡 Astuce du Chef :</Text>
          <Text style={styles.trickText}>
            2/4 c'est exactement la même chose que 1/2 ! La moitié de la pizza !
          </Text>
        </View>
      </View>
    );
  };

  // 6. SHAPES & GEOMETRY
  const renderShapes = () => (
    <View style={styles.modelContainer}>
      <Text style={styles.stepHeader}>🔺 Géométrie : Sommets & Côtés du Triangle</Text>
      <Text style={styles.subtext}>Touche les sommets pour compter les 3 angles :</Text>

      <View style={styles.triangleVisualCard}>
        <View style={styles.shapeDisplayFrame}>
          <Text style={{ fontSize: 80 }}>🔺</Text>
        </View>

        <View style={styles.verticesTallyRow}>
          {[0, 1, 2].map((v) => {
            const isTapped = tappedVertices.includes(v);
            return (
              <TouchableOpacity
                key={v}
                style={[styles.vertexBadge, isTapped && styles.vertexBadgeTapped]}
                onPress={() => {
                  if (!isTapped) {
                    const next = [...tappedVertices, v];
                    setTappedVertices(next);
                    speak(`Sommet numéro ${next.length} touché !`);
                  }
                }}
              >
                <Text style={styles.vertexBadgeText}>Sommet {v + 1} {isTapped ? '✅' : '🔴'}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.mathSummaryBox}>
        <Text style={styles.mathSummaryText}>
          Le triangle a toujours <Text style={{ fontWeight: 'bold', color: '#16A34A' }}>3 côtés droits</Text> et <Text style={{ fontWeight: 'bold', color: '#16A34A' }}>3 sommets pointus</Text> !
        </Text>
      </View>
    </View>
  );

  // 7. READING & PHONICS
  const renderReading = () => {
    const syllables = ['BA', 'NA', 'NE'];
    const allDone = tappedSyllables.length === 3;
    const nextIdx = syllables.findIndex((_, idx) => !tappedSyllables.includes(idx));

    return (
      <View style={styles.modelContainer}>
        <Text style={styles.stepHeader}>🔤 Phonétique & Syllabes</Text>
        <Text style={styles.subtext}>Touche les bulles sonores dans l'ordre pour fusionner le mot :</Text>

        <View style={styles.syllableDemoRow}>
          {syllables.map((syl, idx) => {
            const isTapped = tappedSyllables.includes(idx);
            const isNext = idx === nextIdx;
            return (
              <React.Fragment key={syl}>
                {idx > 0 && <Text style={styles.bigSymbol}>➕</Text>}
                <TouchableOpacity
                  style={[
                    styles.syllableBubble,
                    isTapped && styles.syllableBubbleActive,
                    isNext && styles.syllableBubbleNext
                  ]}
                  onPress={() => {
                    if (!isTapped) {
                      const next = [...tappedSyllables, idx];
                      setTappedSyllables(next);
                      if (next.length === 3) {
                        speak('Bravo ! B A fait Ba, N A fait Na, N E fait Ne. Ba-na-ne ! 🍌');
                      } else {
                        speak(`${syl} !`);
                      }
                    }
                  }}
                >
                  <Text style={[styles.syllableBubbleText, isTapped && styles.syllableBubbleTextActive]}>
                    {syl}
                  </Text>
                  {isTapped && <Text style={styles.checkmarkIcon}>✓</Text>}
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>

        {allDone ? (
          <View style={styles.celebrateWordBox}>
            <Text style={{ fontSize: 40 }}>🍌</Text>
            <Text style={styles.celebrateWordText}>BANANE</Text>
            <Text style={styles.celebrateWordSub}>Tu as réussi la lecture complète !</Text>
          </View>
        ) : (
          <View style={styles.pointerGuideRow}>
            <Text style={{ fontSize: 22 }}>👆</Text>
            <Text style={styles.pointerGuideText}>Touche {syllables[nextIdx]} !</Text>
          </View>
        )}

        <View style={styles.trickBox}>
          <Text style={styles.trickTitle}>💡 Astuce du Hibou :</Text>
          <Text style={styles.trickText}>
            La consonne prépare la bouche, la voyelle fait chanter la voix !
          </Text>
        </View>
      </View>
    );
  };

  // 8. COMPREHENSION (Story Sequence Cards)
  const renderComprehension = () => {
    const storyCards = [
      { id: 0, time: '1. Début 🌅', text: 'Musa prépare son cartable.', icon: '🎒' },
      { id: 1, time: '2. Milieu ☀️', text: 'À l\'école, il apprend à compter.', icon: '🏫' },
      { id: 2, time: '3. Fin 🌙', text: 'Le soir, il dort paisiblement.', icon: '🛌' }
    ];

    return (
      <View style={styles.modelContainer}>
        <Text style={styles.stepHeader}>📖 Compréhension : L'Ordre de l'Histoire</Text>
        <Text style={styles.subtext}>Une histoire a toujours un Début, un Milieu et une Fin :</Text>

        <View style={styles.storySequenceRow}>
          {storyCards.map((card) => {
            const isSelected = storyOrder.includes(card.id);
            return (
              <TouchableOpacity
                key={card.id}
                activeOpacity={0.8}
                style={[styles.storyCardItem, isSelected && styles.storyCardItemSelected]}
                onPress={() => {
                  if (!isSelected) {
                    const next = [...storyOrder, card.id];
                    setStoryOrder(next);
                    speak(`${card.time} : ${card.text}`);
                  }
                }}
              >
                <Text style={{ fontSize: 32 }}>{card.icon}</Text>
                <Text style={styles.storyCardTime}>{card.time}</Text>
                <Text style={styles.storyCardText}>{card.text}</Text>
                {isSelected && <Text style={styles.orderBadge}>Étape {storyOrder.indexOf(card.id) + 1}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {storyOrder.length === 3 && (
          <View style={styles.mathSummaryBox}>
            <Text style={styles.mathSummaryText}>
              🌟 Bravo ! Tu as remis les 3 étapes chronologiques dans le bon ordre !
            </Text>
          </View>
        )}
      </View>
    );
  };

  // 9. SCIENCE & NATURE
  const renderScience = () => {
    const isBlooming = hasSun && hasWater && hasSoil;

    return (
      <View style={styles.modelContainer}>
        <Text style={styles.stepHeader}>🌱 Laboratoire Végétal : Les Besoins de la Plante</Text>
        <Text style={styles.subtext}>Active les éléments essentiels pour faire pousser la plante :</Text>

        <View style={styles.scienceSimulationBox}>
          <View style={[styles.simPlantItem, isBlooming && styles.simPlantItemBlooming]}>
            <Text style={{ fontSize: 60 }}>
              {isBlooming ? '🌻🪴' : hasWater && hasSoil ? '💧🌱' : hasSun && hasSoil ? '☀️🥀' : '🪨🥀'}
            </Text>
            <Text style={styles.simPlantStatus}>
              {isBlooming
                ? 'Plante épanouie et forte ! Photosynthèse réussie !'
                : !hasWater
                ? 'La plante a soif ! Ajoute de l\'eau !'
                : !hasSun
                ? 'Il fait trop sombre ! Donne-lui du soleil !'
                : 'La plante a besoin d\'une terre riche pour ses racines !'}
            </Text>
          </View>
        </View>

        {/* 3 Interactive Toggles */}
        <View style={styles.scienceControlsRow}>
          <TouchableOpacity
            style={[styles.scienceToggleBtn, hasSun && styles.scienceToggleBtnActive]}
            onPress={() => {
              const next = !hasSun;
              setHasSun(next);
              speak(next ? 'Soleil activé ! La lumière donne de l\'énergie.' : 'Soleil éteint.');
            }}
          >
            <Text style={{ fontSize: 22 }}>☀️</Text>
            <Text style={[styles.scienceToggleText, hasSun && styles.scienceToggleTextActive]}>
              {hasSun ? 'Soleil : OUI' : 'Soleil'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.scienceToggleBtn, hasWater && styles.scienceToggleBtnActive]}
            onPress={() => {
              const next = !hasWater;
              setHasWater(next);
              speak(next ? 'Arrosage fait ! L\'eau transporte les nutriments.' : 'Eau coupée.');
            }}
          >
            <Text style={{ fontSize: 22 }}>💧</Text>
            <Text style={[styles.scienceToggleText, hasWater && styles.scienceToggleTextActive]}>
              {hasWater ? 'Eau : OUI' : 'Eau'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.scienceToggleBtn, hasSoil && styles.scienceToggleBtnActive]}
            onPress={() => {
              const next = !hasSoil;
              setHasSoil(next);
              speak(next ? 'Terre fertile ajoutée ! Les racines sont ancrées.' : 'Pas de terre.');
            }}
          >
            <Text style={{ fontSize: 22 }}>🪴</Text>
            <Text style={[styles.scienceToggleText, hasSoil && styles.scienceToggleTextActive]}>
              {hasSoil ? 'Terre : OUI' : 'Terre'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.trickBox}>
          <Text style={styles.trickTitle}>🔬 Règle Scientifique :</Text>
          <Text style={styles.trickText}>
            La plante produit sa propre nourriture grâce à la lumière du soleil, l'eau et les minéraux du sol !
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontSize: 32 }}>🦉</Text>
            <View>
              <Text style={styles.headerTitle}>Le Hibou Tuteur Pédagogique</Text>
              <Text style={styles.headerSubtitle}>Modèles visuels et manipulation concrète</Text>
            </View>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Speed toggle */}
        <View style={styles.topToolsRow}>
          <TouchableOpacity 
            style={[styles.speedToggle, isSlowSpeech && styles.speedToggleActive]} 
            onPress={() => setIsSlowSpeech(!isSlowSpeech)}
          >
            <Text style={styles.speedToggleText}>🐢 Voix lente {isSlowSpeech ? 'ACTIVÉE' : 'DÉSACTIVÉE'}</Text>
          </TouchableOpacity>
        </View>

        {/* Subject Category Selector Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryPillsScroll}>
          {[
            { key: 'ADDITION', label: '➕ Addition' },
            { key: 'SUBTRACTION', label: '➖ Soustraction' },
            { key: 'MULTIPLICATION', label: '✖️ Multiplication' },
            { key: 'DIVISION', label: '➗ Division' },
            { key: 'FRACTIONS', label: '🍕 Fractions' },
            { key: 'SHAPES', label: '🔺 Formes' },
            { key: 'READING', label: '🔤 Lecture' },
            { key: 'COMPREHENSION', label: '📖 Récit' },
            { key: 'SCIENCE', label: '🌱 Science' },
          ].map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.categoryPill,
                activeCategory === tab.key && styles.categoryPillActive
              ]}
              onPress={() => setActiveCategory(tab.key as TutorSubjectCategory)}
            >
              <Text style={[
                styles.categoryPillText,
                activeCategory === tab.key && styles.categoryPillTextActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Scrollable pedagogical body */}
        <ScrollView style={styles.scrollArea}>
          {activeCategory === 'ADDITION' && renderAddition()}
          {activeCategory === 'SUBTRACTION' && renderSubtraction()}
          {activeCategory === 'MULTIPLICATION' && renderMultiplication()}
          {activeCategory === 'DIVISION' && renderDivision()}
          {activeCategory === 'FRACTIONS' && renderFractions()}
          {activeCategory === 'SHAPES' && renderShapes()}
          {activeCategory === 'READING' && renderReading()}
          {activeCategory === 'COMPREHENSION' && renderComprehension()}
          {activeCategory === 'SCIENCE' && renderScience()}
        </ScrollView>

        {/* Action Button: Transfer Challenge */}
        <View style={styles.actionsFooter}>
          <TouchableOpacity 
            style={styles.practiceTransferBtn}
            onPress={() => {
              onClose();
              if (onPracticeSimilar) onPracticeSimilar();
            }}
          >
            <Text style={styles.practiceTransferBtnText}>🎯 Pratiquer un NOUVEL exercice similaire !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(15, 23, 42, 0.85)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 14, 
    zIndex: 1000 
  },
  card: { 
    backgroundColor: 'white', 
    borderRadius: 28, 
    padding: 20, 
    width: '100%', 
    maxWidth: 580, 
    maxHeight: '92%', 
    elevation: 12 
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' },
  headerSubtitle: { fontSize: 12, color: '#64748B' },
  closeBtn: { 
    width: 34, 
    height: 34, 
    borderRadius: 17, 
    backgroundColor: '#F1F5F9', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  closeBtnText: { fontSize: 16, fontWeight: 'bold', color: '#64748B' },

  topToolsRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    marginBottom: 8 
  },
  speedToggle: { 
    paddingVertical: 4, 
    paddingHorizontal: 10, 
    borderRadius: 12, 
    backgroundColor: '#F1F5F9', 
    borderWidth: 1, 
    borderColor: '#CBD5E1' 
  },
  speedToggleActive: { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' },
  speedToggleText: { fontSize: 11, fontWeight: 'bold', color: '#78350F' },

  categoryPillsScroll: { 
    maxHeight: 44, 
    marginBottom: 10 
  },
  categoryPill: { 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 14, 
    backgroundColor: '#F1F5F9', 
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  categoryPillActive: { 
    backgroundColor: '#3B82F6', 
    borderColor: '#2563EB' 
  },
  categoryPillText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  categoryPillTextActive: { color: 'white' },

  // Pedagogical 5 Modes in Addition
  modeTabsRow: { flexDirection: 'row', gap: 4, flexWrap: 'wrap', marginBottom: 8 },
  modeTab: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12, backgroundColor: '#E2E8F0' },
  modeTabActive: { backgroundColor: '#2563EB' },
  modeTabText: { fontSize: 11, fontWeight: 'bold', color: '#475569' },
  modeTabTextActive: { color: 'white' },
  subModelCard: { gap: 8 },
  modeCardHeader: { fontSize: 13, fontWeight: 'bold', color: '#1E293B' },

  // Interactive Regroup Area
  interactiveRegroupArea: { alignItems: 'center', marginVertical: 8 },
  fusionButton: { backgroundColor: '#FEF3C7', padding: 14, borderRadius: 18, borderWidth: 2, borderColor: '#F59E0B', alignItems: 'center' },
  fusionBtnText: { color: '#B45309', fontWeight: 'bold', fontSize: 13, marginTop: 4 },
  fusedResultBox: { backgroundColor: '#DCFCE7', padding: 14, borderRadius: 18, borderWidth: 2, borderColor: '#22C55E', alignItems: 'center' },
  fusedResultText: { color: '#15803D', fontWeight: 'bold', fontSize: 13, marginTop: 4 },
  finalTotalBig: { fontSize: 13, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginTop: 8 },

  scrollArea: { marginBottom: 12 },
  modelContainer: { 
    backgroundColor: '#F8FAFC', 
    padding: 14, 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: '#E2E8F0',
    gap: 10
  },
  stepHeader: { fontSize: 15, fontWeight: 'bold', color: '#0F172A' },
  subtext: { fontSize: 12, color: '#64748B' },

  // Base 10 visual blocks
  concreteBlocksRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 12, 
    marginVertical: 4 
  },
  numberDecomp: { 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: 8, 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    width: 130 
  },
  numberDecompLabel: { fontSize: 20, fontWeight: 'bold', color: '#1E40AF', marginBottom: 4 },
  rodsContainer: { flexDirection: 'row', gap: 3, alignItems: 'flex-end', minHeight: 40, marginBottom: 4 },
  tenRodVisual: { width: 8, height: 38, backgroundColor: '#3B82F6', borderRadius: 2 },
  cubesGrid: { flexDirection: 'row', flexWrap: 'wrap', width: 30, gap: 2 },
  unitCubeVisual: { width: 7, height: 7, backgroundColor: '#F59E0B', borderRadius: 2 },
  decompText: { fontSize: 10, color: '#64748B', fontWeight: 'bold' },
  bigSymbol: { fontSize: 20, marginHorizontal: 4 },

  explanationBox: { 
    backgroundColor: '#EFF6FF', 
    padding: 10, 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: '#BFDBFE' 
  },
  explanationTitle: { fontSize: 12, fontWeight: 'bold', color: '#1E40AF', marginBottom: 2 },
  explanationDesc: { fontSize: 11, color: '#334155', lineHeight: 16 },

  trickBox: { 
    backgroundColor: '#FFFBEB', 
    padding: 10, 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: '#FDE68A' 
  },
  trickTitle: { fontSize: 12, fontWeight: 'bold', color: '#B45309', marginBottom: 2 },
  trickText: { fontSize: 11, color: '#78350F', lineHeight: 16 },

  // Subtraction
  interactiveItemsRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8, 
    justifyContent: 'center', 
    marginVertical: 4 
  },
  subItemBox: { 
    backgroundColor: 'white', 
    padding: 8, 
    borderRadius: 14, 
    borderWidth: 2, 
    borderColor: '#E2E8F0', 
    alignItems: 'center', 
    position: 'relative' 
  },
  subItemBoxCrossed: { backgroundColor: '#FEE2E2', borderColor: '#EF4444' },
  crossOverlay: { position: 'absolute', top: 4, fontSize: 28 },
  subItemIndex: { fontSize: 10, fontWeight: 'bold', color: '#64748B', marginTop: 2 },

  mathSummaryBox: { 
    backgroundColor: '#F0FDF4', 
    padding: 8, 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: '#BBF7D0', 
    alignItems: 'center' 
  },
  mathSummaryText: { fontSize: 12, color: '#166534', fontWeight: 'bold', textAlign: 'center' },

  // Multiplication
  arrayGridBox: { gap: 4, marginVertical: 4 },
  arrayRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: 6, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E2E8F0' 
  },
  arrayRowHighlight: { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' },
  rowLabelText: { fontSize: 11, fontWeight: 'bold', color: '#64748B', width: 75 },
  rowStarsRow: { flexDirection: 'row', flex: 1, justifyContent: 'center' },
  rowTotalBadge: { fontSize: 11, fontWeight: 'bold', color: '#1E40AF', width: 30 },

  // Division
  basketsRow: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginVertical: 4 },
  basketCard: { 
    backgroundColor: 'white', 
    padding: 8, 
    borderRadius: 14, 
    borderWidth: 2, 
    borderColor: '#E2E8F0', 
    alignItems: 'center', 
    flex: 1 
  },
  basketTitle: { fontSize: 10, fontWeight: 'bold', color: '#475569', marginTop: 2 },
  fishInBasketGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center', marginVertical: 4 },
  basketCountBadge: { fontSize: 10, fontWeight: 'bold', color: '#16A34A', backgroundColor: '#DCFCE7', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6 },

  // Fractions
  fractionPizzaRow: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginVertical: 4 },
  fractionSliceBox: { 
    backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: '#E2E8F0', 
    alignItems: 'center', 
    flex: 1 
  },
  fractionSliceFilled: { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' },
  sliceNumberText: { fontSize: 9, fontWeight: 'bold', color: '#64748B', marginTop: 2 },
  fractionNotationBig: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  fractionExplainSub: { fontSize: 10, color: '#475569', marginTop: 2, textAlign: 'center' },

  // Shapes
  triangleVisualCard: { alignItems: 'center', marginVertical: 4 },
  shapeDisplayFrame: { alignItems: 'center', justifyContent: 'center', height: 90 },
  verticesTallyRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  vertexBadge: { backgroundColor: 'white', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  vertexBadgeTapped: { backgroundColor: '#DCFCE7', borderColor: '#22C55E' },
  vertexBadgeText: { fontSize: 10, fontWeight: 'bold', color: '#1E293B' },

  // Reading
  syllableDemoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginVertical: 6 },
  syllableBubble: { 
    backgroundColor: '#EEF2FF', 
    paddingVertical: 8, 
    paddingHorizontal: 14, 
    borderRadius: 14, 
    borderWidth: 2, 
    borderColor: '#6366F1', 
    alignItems: 'center', 
    minWidth: 52 
  },
  syllableBubbleActive: { backgroundColor: '#DCFCE7', borderColor: '#22C55E' },
  syllableBubbleNext: { borderColor: '#F59E0B', borderWidth: 2 },
  syllableBubbleText: { fontSize: 20, fontWeight: 'bold', color: '#4338CA' },
  syllableBubbleTextActive: { color: '#15803D' },
  checkmarkIcon: { fontSize: 10, color: '#16A34A', fontWeight: 'bold' },
  celebrateWordBox: { 
    backgroundColor: '#FEF08A', 
    padding: 10, 
    borderRadius: 14, 
    alignItems: 'center', 
    marginVertical: 4, 
    borderWidth: 2, 
    borderColor: '#EAB308' 
  },
  celebrateWordText: { fontSize: 22, fontWeight: 'bold', color: '#854D0E', letterSpacing: 2 },
  celebrateWordSub: { fontSize: 11, color: '#A16207', fontWeight: 'bold' },

  pointerGuideRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 6, 
    backgroundColor: '#FEF9C3', 
    paddingVertical: 4, 
    paddingHorizontal: 10, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#FACC15', 
    marginVertical: 4 
  },
  pointerGuideText: { fontSize: 11, fontWeight: 'bold', color: '#854D0E' },

  // Comprehension
  storySequenceRow: { flexDirection: 'row', gap: 6, marginVertical: 4 },
  storyCardItem: { 
    flex: 1, 
    backgroundColor: 'white', 
    padding: 8, 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: '#E2E8F0', 
    alignItems: 'center' 
  },
  storyCardItemSelected: { borderColor: '#3B82F6', backgroundColor: '#EFF6FF' },
  storyCardTime: { fontSize: 9, fontWeight: 'bold', color: '#2563EB', marginTop: 2 },
  storyCardText: { fontSize: 9, color: '#475569', textAlign: 'center', marginTop: 2 },
  orderBadge: { fontSize: 9, fontWeight: 'bold', color: '#16A34A', marginTop: 2 },

  // Science
  scienceSimulationBox: { alignItems: 'center', marginVertical: 6 },
  simPlantItem: { 
    alignItems: 'center', 
    backgroundColor: '#F1F5F9', 
    padding: 12, 
    borderRadius: 18, 
    borderWidth: 2, 
    borderColor: '#CBD5E1', 
    width: '100%', 
    maxWidth: 280 
  },
  simPlantItemBlooming: { backgroundColor: '#ECFDF5', borderColor: '#34D399' },
  simPlantStatus: { fontSize: 11, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginTop: 4 },
  scienceControlsRow: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginVertical: 4 },
  scienceToggleBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4, 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 14, 
    backgroundColor: '#F1F5F9', 
    borderWidth: 2, 
    borderColor: '#CBD5E1' 
  },
  scienceToggleBtnActive: { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' },
  scienceToggleText: { fontSize: 11, fontWeight: 'bold', color: '#475569' },
  scienceToggleTextActive: { color: '#B45309' },

  // Action
  actionsFooter: { gap: 6 },
  practiceTransferBtn: { 
    backgroundColor: '#10B981', 
    paddingVertical: 12, 
    borderRadius: 16, 
    alignItems: 'center', 
    elevation: 3 
  },
  practiceTransferBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});
