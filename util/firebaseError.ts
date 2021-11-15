const firebaseErrors: Record<string, string> = {
  'auth/user-not-found':
    'Não há nenhum usuário cadastrado com estas credenciais na base de dados.',
  'auth/wrong-password':
    'A senha é inválida ou o usuário não possui uma senha.',
  'auth/too-many-requests':
    'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.',
  'auth/email-already-in-use':
    'O endereço de e-mail já está sendo usado por outra conta.',
}

export const firebaseError = (code: string) =>
  code in firebaseErrors ? firebaseErrors[code] : 'Erro não mapeado.'
