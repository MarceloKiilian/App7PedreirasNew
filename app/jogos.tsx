import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { Gamepad2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react-native';

const PERGUNTAS = [
  {
    pergunta: "Qual Orixá é o senhor da justiça e do trovão?",
    opcoes: ["Ogum", "Xangô", "Oxossi", "Omulu"],
    correta: 1
  },
  {
    pergunta: "Qual Orixá é a rainha do mar?",
    opcoes: ["Oxum", "Iansã", "Iemanjá", "Nanã"],
    correta: 2
  },
  {
    pergunta: "Quem é o caçador de uma flecha só?",
    opcoes: ["Ogum", "Oxóssi", "Logun Edé", "Ossain"],
    correta: 1
  },
  {
    pergunta: "Qual a cor principal de Ogum na Umbanda?",
    opcoes: ["Verde", "Marrom", "Vermelho", "Amarelo"],
    correta: 2
  },
  {
    pergunta: "Qual Orixá é saudado com 'Atotô'?",
    opcoes: ["Xangô", "Oxalá", "Omulu", "Exu"],
    correta: 2
  },
  {
    pergunta: "Qual a saudação para a Orixá Iansã?",
    opcoes: ["Ora Yê Yê Ô", "Eparrei", "Odoyá", "Atotô"],
    correta: 1
  },
  {
    pergunta: "Quem é a Orixá das águas doces, do amor e da prosperidade?",
    opcoes: ["Iemanjá", "Nanã", "Oxum", "Obá"],
    correta: 2
  },
  {
    pergunta: "Qual Orixá é o mensageiro entre os homens e os Orixás?",
    opcoes: ["Exu", "Oxalá", "Ogum", "Xangô"],
    correta: 0
  },
  {
    pergunta: "Qual Orixá representa a paz, a pureza e a criação?",
    opcoes: ["Iansã", "Oxalá", "Nanã", "Oxum"],
    correta: 1
  },
  {
    pergunta: "Qual a saudação correta para o Orixá Oxóssi?",
    opcoes: ["Patakori", "Okê Arô", "Kaô Kabecile", "Alupô"],
    correta: 1
  }
];

export default function JogosScreen() {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);

  const responder = (index: number) => {
    setOpcaoSelecionada(index);
    if (index === PERGUNTAS[perguntaAtual].correta) {
      setPontuacao(pontuacao + 1);
    }

    setTimeout(() => {
      if (perguntaAtual < PERGUNTAS.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
        setOpcaoSelecionada(null);
      } else {
        setMostrarResultado(true);
      }
    }, 1000);
  };

  const reiniciar = () => {
    setPerguntaAtual(0);
    setPontuacao(0);
    setMostrarResultado(false);
    setOpcaoSelecionada(null);
  };

  if (mostrarResultado) {
    return (
      <View style={styles.container}>
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Fim do Quiz!</Text>
          <Text style={styles.resultScore}>Você acertou {pontuacao} de {PERGUNTAS.length}</Text>
          <Text style={styles.resultMessage}>
            {pontuacao === PERGUNTAS.length ? "Parabéns! Você conhece muito sobre os Orixás! 🌟" : "Bom trabalho! Continue estudando para aprender mais. 🙏"}
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={reiniciar}>
            <RotateCcw color={Colors.white} size={24} />
            <Text style={styles.restartText}>Jogar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const q = PERGUNTAS[perguntaAtual];

  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Pergunta {perguntaAtual + 1} de {PERGUNTAS.length}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((perguntaAtual + 1) / PERGUNTAS.length) * 100}%` }]} />
        </View>
      </View>

      <View style={[styles.questionCard, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.questionText}>{q.pergunta}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {q.opcoes.map((opcao, index) => {
          let buttonStyle: any = styles.optionButton;
          let textStyle: any = styles.optionText;
          
          if (opcaoSelecionada !== null) {
            if (index === q.correta) {
              buttonStyle = [styles.optionButton, styles.optionCorrect];
              textStyle = [styles.optionText, styles.textWhite];
            } else if (index === opcaoSelecionada) {
              buttonStyle = [styles.optionButton, styles.optionWrong];
              textStyle = [styles.optionText, styles.textWhite];
            }
          }

          return (
            <TouchableOpacity 
              key={index} 
              style={buttonStyle} 
              onPress={() => opcaoSelecionada === null && responder(index)}
              disabled={opcaoSelecionada !== null}
            >
              <Text style={textStyle}>{opcao}</Text>
              {opcaoSelecionada !== null && index === q.correta && <CheckCircle2 color={Colors.white} size={20} />}
              {opcaoSelecionada !== null && index === opcaoSelecionada && index !== q.correta && <XCircle color={Colors.white} size={20} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  progressHeader: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  questionCard: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textDark,
    textAlign: 'center',
    lineHeight: 30,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 1,
  },
  optionText: {
    fontSize: 18,
    color: '#444',
    fontWeight: '600',
  },
  optionCorrect: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionWrong: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  textWhite: {
    color: Colors.white,
  },
  resultCard: {
    backgroundColor: Colors.white,
    padding: 40,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
    fontWeight: '600',
  },
  resultMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  restartText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
