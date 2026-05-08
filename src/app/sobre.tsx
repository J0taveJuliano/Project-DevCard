import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SobreScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>💼</Text>
        <Text style={styles.title}>DevCard</Text>
        <Text style={styles.version}>Versão 1.0.0</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Sobre o App</Text>
          <Text style={styles.text}>
            DevCard é um aplicativo para criar cartões de visita digitais personalizados 
            para desenvolvedores. Crie seu perfil profissional de forma rápida e compartilhe 
            com sua rede.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funcionalidades</Text>
          <Text style={styles.bulletPoint}>• Criação de cartão personalizado</Text>
          <Text style={styles.bulletPoint}>• Escolha de cores para o cartão</Text>
          <Text style={styles.bulletPoint}>• Badge de nível baseado em experiência</Text>
          <Text style={styles.bulletPoint}>• Tags de tecnologias coloridas</Text>
          <Text style={styles.bulletPoint}>• Compartilhamento via área de transferência</Text>
          <Text style={styles.bulletPoint}>• Preview em tempo real</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Níveis de Experiência</Text>
          <View style={styles.levelContainer}>
            <View style={[styles.levelBadge, { backgroundColor: '#808080' }]}>
              <Text style={styles.levelText}>JÚNIOR</Text>
            </View>
            <Text style={styles.levelDescription}>0 a 2 anos</Text>
          </View>
          <View style={styles.levelContainer}>
            <View style={[styles.levelBadge, { backgroundColor: '#2196F3' }]}>
              <Text style={styles.levelText}>PLENO</Text>
            </View>
            <Text style={styles.levelDescription}>3 a 5 anos</Text>
          </View>
          <View style={styles.levelContainer}>
            <View style={[styles.levelBadge, { backgroundColor: '#FFD700' }]}>
              <Text style={styles.levelText}>SÊNIOR</Text>
            </View>
            <Text style={styles.levelDescription}>6 ou mais anos</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desenvolvido por: </Text>
          <Text style={styles.sectionTitle}>João Vitor Cordeiro Juliano - 4510306525</Text>
          <Text style={styles.text}>
            Projeto desenvolvido como atividade prática de desenvolvimento mobile.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tecnologias Utilizadas</Text>
          <Text style={styles.bulletPoint}>• React Native</Text>
          <Text style={styles.bulletPoint}>• Expo</Text>
          <Text style={styles.bulletPoint}>• TypeScript</Text>
          <Text style={styles.bulletPoint}>• Expo Router</Text>
          <Text style={styles.bulletPoint}>• Expo Clipboard</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    color: '#1a1a1a',
    letterSpacing: 1,
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#444',
    lineHeight: 28,
    paddingLeft: 8,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  levelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  levelDescription: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 24,
  },
  backButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
