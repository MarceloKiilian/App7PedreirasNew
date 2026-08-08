import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { Music, Play, Pause, Square } from 'lucide-react-native';
import { Audio } from 'expo-av';

const MUSICAS = [
  { id: '1', titulo: "Exu - É chegada a hora", url: "https://marcelokiilian.github.io/setepedreiras/pontos/Coroacao2017EhHora.mp3" },
  { id: '2', titulo: "Abertura", url: "https://marcelokiilian.github.io/setepedreiras/pontos/Abertura.mp3" },
  { id: '3', titulo: "Xangô - Pai 7 Pedreiras", url: "https://marcelokiilian.github.io/setepedreiras/pontos/PaiSetePedreiras.mp3" },
  { id: '4', titulo: "Xangô - Por detras daquela serra", url: "https://marcelokiilian.github.io/setepedreiras/pontos/Pordetrasdaquelaserra.mp3" },
  { id: '5', titulo: "Caboclos - Aruande", url: "https://marcelokiilian.github.io/setepedreiras/pontos/Aruande.mp3" },
  { id: '6', titulo: "Baianos - Sete Saias", url: "https://marcelokiilian.github.io/setepedreiras/pontos/BaianaSeteSaias.mp3" },
  { id: '7', titulo: "Oxalá - Jesus que é nosso Pai", url: "https://marcelokiilian.github.io/setepedreiras/pontos/JesusNossoPai.mp3" },
  { id: '8', titulo: "Marinheiros e Iemanjá", url: "https://marcelokiilian.github.io/setepedreiras/pontos/MarinheirosIemanja.mp3" }
];

export default function MusicasScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [status, setStatus] = useState<any>(null);

  async function playSound(item: any) {
    try {
      // Se já está tocando a mesma música, pausa ou retoma
      if (sound && playingId === item.id) {
        if (status?.isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        return;
      }

      // Se está tocando outra música, para ela antes
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setPlayingId(null);
      }

      setIsLoading(item.id);
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: item.url },
        { shouldPlay: true, progressUpdateIntervalMillis: 500 },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      setPlayingId(item.id);
      setIsLoading(null);
    } catch (error) {
      console.error("Erro ao tocar áudio:", error);
      Alert.alert(
        "Erro de Áudio",
        `Não foi possível carregar o ponto: ${item.titulo}.\n\nURL: ${item.url}\n\nVerifique sua conexão ou se o arquivo ainda está disponível.`
      );
      setIsLoading(null);
    }
  }

  const onPlaybackStatusUpdate = (playbackStatus: any) => {
    setStatus(playbackStatus);
    if (playbackStatus.didJustFinish) {
      setPlayingId(null);
    }
  };

  const getProgress = () => {
    if (status?.durationMillis > 0 && status?.positionMillis > 0) {
      return (status.positionMillis / status.durationMillis) * 100;
    }
    return 0;
  };

  const formatTime = (millis: number) => {
    if (!millis) return "0:00";
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setPlayingId(null);
      setStatus(null);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Ouça os pontos cantados do nosso terreiro.</Text>
        
        {MUSICAS.map((item) => {
          const isThisPlaying = playingId === item.id;
          const isThisLoading = isLoading === item.id;
          
          return (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.item, 
                { borderTopWidth: 4, borderTopColor: isThisPlaying ? Colors.accent : Colors.green }
              ]} 
              onPress={() => playSound(item)}
              disabled={!!isLoading}
            >
              <View style={styles.iconContainer}>
                <Music color={isThisPlaying ? Colors.accent : Colors.primary} size={24} />
              </View>
              
              <View style={styles.textContainer}>
                <Text style={[styles.title, isThisPlaying && { color: Colors.accent }]}>
                  {item.titulo}
                </Text>
                {isThisPlaying && status?.isPlaying && (
                  <Text style={styles.playingText}>Tocando agora...</Text>
                )}
              </View>

              <View style={styles.actionContainer}>
                {isThisLoading ? (
                  <ActivityIndicator color={Colors.primary} size="small" />
                ) : isThisPlaying ? (
                  status?.isPlaying ? (
                    <Pause color={Colors.accent} size={24} fill={Colors.accent} />
                  ) : (
                    <Play color={Colors.accent} size={24} fill={Colors.accent} />
                  )
                ) : (
                  <Play color={Colors.primary} size={20} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.spacer} />
      </ScrollView>

      {playingId && (
        <View style={styles.playerBar}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressFill, { width: `${getProgress()}%` }]} />
          </View>
          
          <View style={styles.playerContent}>
            <View style={styles.playerInfo}>
              <Text style={styles.playerTitle} numberOfLines={1}>
                {MUSICAS.find(m => m.id === playingId)?.titulo}
              </Text>
              <Text style={styles.playerTime}>
                {formatTime(status?.positionMillis)} / {formatTime(status?.durationMillis)}
              </Text>
            </View>
            <View style={styles.playerControls}>
              <TouchableOpacity onPress={() => playSound(MUSICAS.find(m => m.id === playingId))} style={styles.playerButton}>
                {status?.isPlaying ? (
                  <Pause color={Colors.white} size={28} fill={Colors.white} />
                ) : (
                  <Play color={Colors.white} size={28} fill={Colors.white} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={stopSound} style={[styles.playerButton, { marginLeft: 15 }]}>
                <Square color={Colors.white} size={24} fill={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 120, // Aumentado para o player novo
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    backgroundColor: '#fef5e7',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.textDark,
    fontWeight: '600',
  },
  playingText: {
    fontSize: 12,
    color: Colors.accent,
    marginTop: 2,
    fontWeight: '500',
  },
  actionContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    height: 40,
  },
  playerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'hidden', // Importante para o border radius da barra de progresso
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gold,
  },
  playerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  playerTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerButton: {
    padding: 5,
  },
});
