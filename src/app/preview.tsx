import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    nome: string;
    cargo: string;
    empresa: string;
    anosExperiencia: string;
    favTecnologia: string;
    tecnologias: string;
    corCartao: string;
  }>();

  const primeiraLetra = params.nome.charAt(0).toUpperCase();

  const anos = parseInt(params.anosExperiencia);
  let nivel = '';
  let corBadge = '';

  if (anos >= 0 && anos <= 2) {
    nivel = 'Júnior';
    corBadge = '#808080';
  } else if (anos >= 3 && anos <= 5) {
    nivel = 'Pleno';
    corBadge = '#2196F3';
  } else if (anos >= 6) {
    nivel = 'Sênior';
    corBadge = '#FFD700';
  }

  const tecnologiasList = params.tecnologias
    ? params.tecnologias.split(',').map(t => t.trim()).filter(t => t.length > 0)
    : [];

  const chipColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

  const handleCompartilhar = async () => {
    const textoFormatado = `
🎴 CARTÃO DE VISITA DIGITAL

👤 ${params.nome}
💼 ${params.cargo}${params.empresa ? ` • ${params.empresa}` : ''}
⭐ Nível: ${nivel}
📅 ${params.anosExperiencia} ${anos === 1 ? 'ano' : 'anos'} de experiência
🚀 Especialista em ${params.favTecnologia}

💻 Tecnologias:
${tecnologiasList.map(tech => `  • ${tech}`).join('\n')}

---
Criado com DevCard 💼
    `.trim();

    try {
      await Clipboard.setStringAsync(textoFormatado);
      Alert.alert('Sucesso!', 'Dados copiados para a área de transferência');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível copiar os dados');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Preview do Cartão</Text>
          <Text style={styles.headerSubtitle}>Seu cartão de visita digital</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={[styles.card, { backgroundColor: params.corCartao }]}>
            <View style={styles.cardContent}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{primeiraLetra}</Text>
              </View>

              <Text style={styles.cardName}>{params.nome}</Text>

              <Text style={styles.cardCargo}>
                {params.cargo}
                {params.empresa && ` • ${params.empresa}`}
              </Text>

              <Text style={styles.cardEspecialista}>
                Especialista em {params.favTecnologia}
              </Text>

              {/* Technology chips */}
              {tecnologiasList.length > 0 && (
                <View style={styles.techContainer}>
                  {tecnologiasList.map((tech, index) => (
                    <View
                      key={index}
                      style={[
                        styles.techChip,
                        { backgroundColor: chipColors[index % chipColors.length] }
                      ]}
                    >
                      <Text style={styles.techChipText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.cardDivider} />

              <View style={styles.badgeContainer}>
                <View style={[styles.badge, { backgroundColor: corBadge }]}>
                  <Text style={styles.badgeText}>{nivel}</Text>
                </View>
                <Text style={styles.experienciaText}>
                  {params.anosExperiencia} {anos === 1 ? 'ano' : 'anos'} de experiência
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={handleCompartilhar}>
            <Text style={styles.shareButtonText}>📋 Compartilhar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.back()}
          >
            <Text style={styles.editButtonText}>✏️ Editar dados</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => router.replace('/sucesso')}
          >
            <Text style={styles.confirmButtonText}>✅ Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#666',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardCargo: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  cardEspecialista: {
    fontSize: 17,
    color: '#fff',
    opacity: 0.95,
    fontStyle: 'italic',
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  techChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  techChipText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  cardEmpresa: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  cardDivider: {
    height: 2,
    width: '100%',
    backgroundColor: '#fff',
    opacity: 0.3,
    marginVertical: 16,
  },
  badgeContainer: {
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  experienciaText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  cardInfo: {
    gap: 8,
  },
  cardInfoText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  buttonContainer: {
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  editButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  editButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});