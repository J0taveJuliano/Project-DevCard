import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CadastroScreen() {
  const router = useRouter();

  const CORES = [
    { label: 'Azul', hex: '#2196F3' },
    { label: 'Verde', hex: '#4CAF50' },
    { label: 'Roxo', hex: '#9C27B0' },
  ];

  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [anosExperiencia, setAnosExperiencia] = useState('');
  const [favTecnologia, setFavTecnologia] = useState('');
  const [tecnologias, setTecnologias] = useState('');
  const [corCartao, setCorCartao] = useState('#2196F3');
  const [errors, setErrors] = useState({
    nome: '',
    cargo: '',
    anosExperiencia: '',
    favTecnologia: '',
    tecnologias: ''
  });
  
  const handleGerarCartao = () => {
    const newErrors = {
      nome: '',
      cargo: '',
      anosExperiencia: '',
      favTecnologia: '',
      tecnologias: ''
    };

    let hasError = false;

    if (!nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
      hasError = true;
    } else if (nome.length < 3) {
      newErrors.nome = 'Nome deve ter no mínimo 3 caracteres';
      hasError = true;
    }

    if (!cargo.trim()) {
      newErrors.cargo = 'Cargo é obrigatório';
      hasError = true;
    }

    if (!favTecnologia.trim()) {
      newErrors.favTecnologia = 'Tecnologia é obrigatória';
      hasError = true;
    }

    const expNum = parseInt(anosExperiencia);
    if (isNaN(expNum) || expNum < 0) {
      newErrors.anosExperiencia = 'Deve ser um número válido';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    router.push({
      pathname: '/preview',
      params: { nome, cargo, empresa, anosExperiencia, favTecnologia, tecnologias, corCartao }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Text>Preencha seus dados de dev</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.nome && styles.inputError]}
          placeholder="Nome completo"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={(text) => {
            setNome(text);
            if (errors.nome) {
              setErrors({...errors, nome: ''});
            }
          }}
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
        />
        {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.cargo && styles.inputError]}
          placeholder="Cargo"
          placeholderTextColor="#888"
          value={cargo}
          onChangeText={(text) => {
            setCargo(text);
            if (errors.cargo) {
              setErrors({...errors, cargo: ''});
            }
          }}
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
        />
        {errors.cargo ? <Text style={styles.errorText}>{errors.cargo}</Text> : null}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Empresa"
        placeholderTextColor="#888"
        value={empresa}
        onChangeText={setEmpresa}
        autoCapitalize="words"
        autoCorrect={false}
        keyboardType="default"
        returnKeyType="done"
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.anosExperiencia && styles.inputError]}
          placeholder="Anos de experiência"
          placeholderTextColor="#888"
          value={anosExperiencia}
          onChangeText={(text) => {
            setAnosExperiencia(text);
            if (errors.anosExperiencia) {
              setErrors({...errors, anosExperiencia: ''});
            }
          }}
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="numeric"
          returnKeyType="done"
        />
        {errors.anosExperiencia ? <Text style={styles.errorText}>{errors.anosExperiencia}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.favTecnologia && styles.inputError]}
          placeholder="Tecnologia favorita"
          placeholderTextColor="#888"
          value={favTecnologia}
          onChangeText={(text) => {
            setFavTecnologia(text);
            if (errors.favTecnologia) {
              setErrors({...errors, favTecnologia: ''});
            }
          }}
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
        />
        {errors.favTecnologia ? <Text style={styles.errorText}>{errors.favTecnologia}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.tecnologias && styles.inputError]}
          placeholder="Tecnologias (separadas por vírgula)"
          placeholderTextColor="#888"
          value={tecnologias}
          onChangeText={(text) => {
            setTecnologias(text);
            if (errors.tecnologias) {
              setErrors({...errors, tecnologias: ''});
            }
          }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
          multiline
        />
        {errors.tecnologias ? <Text style={styles.errorText}>{errors.tecnologias}</Text> : null}
        <Text style={styles.helperText}>Ex: React, Node.js, TypeScript</Text>
      </View>

      <View style={styles.colorContainer}>
        <Text style={styles.colorLabel}>Cor do cartão:</Text>
        <View style={styles.colorOptions}>
          {CORES.map((cor) => (
            <TouchableOpacity
              key={cor.label}
              style={[
                styles.colorButton,
                { backgroundColor: cor.hex },
                corCartao === cor.hex && styles.colorButtonSelected
              ]}
              onPress={() => setCorCartao(cor.hex)}
            >
              <Text style={styles.colorButtonText}>{cor.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => handleGerarCartao()}
      >
        <Text style={styles.primaryButtonText}>✅ Completar o cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.back()}
      >
        <Text style={styles.secondaryButtonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  inputContainer: {
    width: '100%',
    marginVertical: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    width: '100%',
  },
  inputError: {
    borderColor: '#ff0000',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontStyle: 'italic',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
    minWidth: 100,
  },
  colorOptions: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  colorButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  colorButtonSelected: {
    borderWidth: 3,
    borderColor: '#000',
  },
  colorButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});