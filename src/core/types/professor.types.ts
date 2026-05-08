export interface Professor {
  id: string;
  name: string;
  avatarUrl?: string; // Imagen de cara (perfil)
  fullImageUrl?: string; // Imagen larga/completa para el perfil detallado
  difficultyLevel: string; // Ej: '100% Ayuda', '75% Ayuda', 'Estricto'
  shortStory: string;
  promptBehavior: string;
}
