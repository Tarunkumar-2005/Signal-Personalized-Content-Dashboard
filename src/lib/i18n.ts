import type { ContentCategory, ContentSource, SupportedLanguage } from "@/types";

export interface Translations {
  appName: string;
  tagline: string;
  nav: {
    feed: string;
    trending: string;
    favorites: string;
    analytics: string;
    settings: string;
  };
  headers: {
    yourFeed: string;
    feedDesc: string;
    trendingNow: string;
    trendingDesc: string;
    favorites: string;
    favoritesDesc: string;
    analytics: string;
    analyticsDesc: string;
    settings: string;
    settingsDesc: string;
    searchResults: string;
    searchDesc: string;
  };
  search: {
    placeholder: string;
    allSources: string;
    recentSearches: string;
    clear: string;
    noResults: string;
    resultsFound: string;
  };
  actions: {
    readMore: string;
    playNow: string;
    viewPost: string;
    watchTrailer: string;
    addToFavorites: string;
    removeFromFavorites: string;
    share: string;
    copied: string;
    reorderReset: string;
    loadMore: string;
    refresh: string;
    close: string;
    exportFavorites: string;
    clearAll: string;
    filterBy: string;
    sortBy: string;
    viewMode: string;
  };
  sort: {
    newest: string;
    trending: string;
    topRated: string;
    mostDiscussed: string;
  };
  categories: Record<ContentCategory, string>;
  sources: Record<ContentSource, string>;
  settings: {
    contentPreferences: string;
    categoriesDesc: string;
    sourcesTitle: string;
    sourcesDesc: string;
    appearance: string;
    darkMode: string;
    density: string;
    pagination: string;
    infiniteScroll: string;
    paged: string;
    language: string;
    autoRefresh: string;
    autoRefreshDesc: string;
    resetAll: string;
  };
  analytics: {
    readingStats: string;
    articlesRead: string;
    favoritesSaved: string;
    topCategory: string;
    streakDays: string;
    categoryBreakdown: string;
    sourceDistribution: string;
  };
  auth: {
    profile: string;
    login: string;
    logout: string;
    editProfile: string;
    guestUser: string;
    saveChanges: string;
  };
  realtime: {
    liveUpdates: string;
    newStoriesAvailable: string;
    markAllRead: string;
    noNotifications: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    appName: "Signal",
    tagline: "Your Personalized Content Hub",
    nav: {
      feed: "Feed",
      trending: "Trending",
      favorites: "Favorites",
      analytics: "Analytics",
      settings: "Settings",
    },
    headers: {
      yourFeed: "Your Personalized Feed",
      feedDesc: "News, media recommendations, and social updates tailored to your taste. Drag cards to reorder.",
      trendingNow: "Trending Momentum",
      trendingDesc: "Top breakout stories, hit media, and viral discussions climbing right now.",
      favorites: "Saved Favorites",
      favoritesDesc: "Your curated bookmarks and saved media for offline reference.",
      analytics: "Reading Insights & Analytics",
      analyticsDesc: "Track your content consumption, topic interests, and reading patterns.",
      settings: "Dashboard Preferences",
      settingsDesc: "Fine-tune categories, layout density, multi-source feeds, and interface theme.",
      searchResults: "Search Results",
      searchDesc: "Showing matched content across all connected providers.",
    },
    search: {
      placeholder: "Search news, movies, tracks, and posts...",
      allSources: "All Sources",
      recentSearches: "Recent Searches",
      clear: "Clear",
      noResults: "No results found for your query",
      resultsFound: "results found",
    },
    actions: {
      readMore: "Read Story",
      playNow: "Play Preview",
      viewPost: "View Post",
      watchTrailer: "Watch Preview",
      addToFavorites: "Save to Favorites",
      removeFromFavorites: "Remove Favorite",
      share: "Share Story",
      copied: "Link copied to clipboard!",
      reorderReset: "Reset Order",
      loadMore: "Load More Content",
      refresh: "Refresh Feed",
      close: "Close",
      exportFavorites: "Export Favorites",
      clearAll: "Clear All",
      filterBy: "Filter by",
      sortBy: "Sort by",
      viewMode: "Display Mode",
    },
    sort: {
      newest: "Latest First",
      trending: "Top Trending",
      topRated: "Highest Rated",
      mostDiscussed: "Most Discussed",
    },
    categories: {
      technology: "Technology",
      sports: "Sports",
      finance: "Finance",
      entertainment: "Entertainment",
      science: "Science",
      health: "Health",
      gaming: "Gaming",
      business: "Business",
    },
    sources: {
      news: "News Wire",
      recommendation: "Media Pick",
      social: "Social Pulse",
    },
    settings: {
      contentPreferences: "Category Selection",
      categoriesDesc: "Choose the topics you want included in your daily unified feed.",
      sourcesTitle: "Connected Data Sources",
      sourcesDesc: "Toggle News API, TMDB/Spotify Recommendations, and Social feeds.",
      appearance: "Appearance & Layout",
      darkMode: "Dark Mode Interface",
      density: "Card Layout Style",
      pagination: "Feed Pagination Method",
      infiniteScroll: "Infinite Scroll",
      paged: "Numbered Pages",
      language: "Interface Language",
      autoRefresh: "Real-time Stream Auto-refresh",
      autoRefreshDesc: "Automatically stream incoming breaking news alerts into your buffer.",
      resetAll: "Reset to Default Preferences",
    },
    analytics: {
      readingStats: "Content Consumption Overview",
      articlesRead: "Stories Explored",
      favoritesSaved: "Items Bookmarked",
      topCategory: "Primary Interest",
      streakDays: "Day Streak",
      categoryBreakdown: "Interest Distribution",
      sourceDistribution: "Source Breakdown",
    },
    auth: {
      profile: "User Profile",
      login: "Sign In",
      logout: "Sign Out",
      editProfile: "Edit Profile",
      guestUser: "Guest Reader",
      saveChanges: "Save Changes",
    },
    realtime: {
      liveUpdates: "Live Activity & Alerts",
      newStoriesAvailable: "new updates available. Click to load",
      markAllRead: "Mark all as read",
      noNotifications: "No new alerts right now",
    },
  },
  es: {
    appName: "Signal",
    tagline: "Tu Centro de Contenido Personalizado",
    nav: {
      feed: "Feed",
      trending: "Tendencias",
      favorites: "Favoritos",
      analytics: "Analítica",
      settings: "Ajustes",
    },
    headers: {
      yourFeed: "Tu Feed Personalizado",
      feedDesc: "Noticias, recomendaciones y redes sociales adaptadas a ti.",
      trendingNow: "Tendencias Ahora",
      trendingDesc: "Las historias y recomendaciones más populares del momento.",
      favorites: "Favoritos Guardados",
      favoritesDesc: "Tus marcadores y contenido guardado para después.",
      analytics: "Estadísticas de Lectura",
      analyticsDesc: "Monitorea tus hábitos de consumo e intereses temáticos.",
      settings: "Preferencias del Panel",
      settingsDesc: "Personaliza tus categorías, fuentes y tema visual.",
      searchResults: "Resultados de Búsqueda",
      searchDesc: "Mostrando coincidencias en todas las fuentes.",
    },
    search: {
      placeholder: "Buscar noticias, películas, música y publicaciones...",
      allSources: "Todas las fuentes",
      recentSearches: "Búsquedas recientes",
      clear: "Limpiar",
      noResults: "No se encontraron resultados",
      resultsFound: "resultados encontrados",
    },
    actions: {
      readMore: "Leer Más",
      playNow: "Reproducir",
      viewPost: "Ver Publicación",
      watchTrailer: "Ver Avance",
      addToFavorites: "Guardar en Favoritos",
      removeFromFavorites: "Eliminar de Favoritos",
      share: "Compartir",
      copied: "¡Enlace copiado al portapapeles!",
      reorderReset: "Restablecer Orden",
      loadMore: "Cargar Más",
      refresh: "Actualizar",
      close: "Cerrar",
      exportFavorites: "Exportar Favoritos",
      clearAll: "Borrar Todo",
      filterBy: "Filtrar por",
      sortBy: "Ordenar por",
      viewMode: "Modo de Vista",
    },
    sort: {
      newest: "Más Recientes",
      trending: "Más Populares",
      topRated: "Mejor Valorados",
      mostDiscussed: "Más Comentados",
    },
    categories: {
      technology: "Tecnología",
      sports: "Deportes",
      finance: "Finanzas",
      entertainment: "Entretenimiento",
      science: "Ciencia",
      health: "Salud",
      gaming: "Videojuegos",
      business: "Negocios",
    },
    sources: {
      news: "Noticias",
      recommendation: "Recomendación",
      social: "Red Social",
    },
    settings: {
      contentPreferences: "Selección de Categorías",
      categoriesDesc: "Elige los temas que deseas en tu feed diario.",
      sourcesTitle: "Fuentes Conectadas",
      sourcesDesc: "Activa o desactiva fuentes de noticias, multimedia y redes.",
      appearance: "Apariencia y Diseño",
      darkMode: "Modo Oscuro",
      density: "Estilo de Tarjetas",
      pagination: "Método de Paginación",
      infiniteScroll: "Desplazamiento Infinito",
      paged: "Páginas Numeradas",
      language: "Idioma de Interfaz",
      autoRefresh: "Actualización en Tiempo Real",
      autoRefreshDesc: "Transmite automáticamente alertas y nuevas historias.",
      resetAll: "Restablecer Valores Predeterminados",
    },
    analytics: {
      readingStats: "Resumen de Lectura",
      articlesRead: "Historias Leídas",
      favoritesSaved: "Favoritos Guardados",
      topCategory: "Categoría Principal",
      streakDays: "Días Seguidos",
      categoryBreakdown: "Distribución de Intereses",
      sourceDistribution: "Desglose por Fuente",
    },
    auth: {
      profile: "Perfil de Usuario",
      login: "Iniciar Sesión",
      logout: "Cerrar Sesión",
      editProfile: "Editar Perfil",
      guestUser: "Lector Invitado",
      saveChanges: "Guardar Cambios",
    },
    realtime: {
      liveUpdates: "Actividad y Alertas en Vivo",
      newStoriesAvailable: "nuevas historias disponibles. Clic para cargar",
      markAllRead: "Marcar todas como leídas",
      noNotifications: "Sin nuevas alertas",
    },
  },
  fr: {
    appName: "Signal",
    tagline: "Votre Hub de Contenu Personnalisé",
    nav: {
      feed: "Flux",
      trending: "Tendances",
      favorites: "Favoris",
      analytics: "Statistiques",
      settings: "Paramètres",
    },
    headers: {
      yourFeed: "Votre Flux Personnalisé",
      feedDesc: "Actualités, recommandations et médias sociaux sur mesure.",
      trendingNow: "Tendances Actuelles",
      trendingDesc: "Les sujets et médias les plus populaires en ce moment.",
      favorites: "Favoris Enregistrés",
      favoritesDesc: "Vos contenus sauvegardés pour plus tard.",
      analytics: "Statistiques de Lecture",
      analyticsDesc: "Suivez votre consommation et vos centres d'intérêt.",
      settings: "Préférences du Tableau de Bord",
      settingsDesc: "Personnalisez vos catégories, sources et thème.",
      searchResults: "Résultats de Recherche",
      searchDesc: "Résultats correspondants sur l'ensemble des sources.",
    },
    search: {
      placeholder: "Rechercher actualités, films, musique...",
      allSources: "Toutes les sources",
      recentSearches: "Recherches récentes",
      clear: "Effacer",
      noResults: "Aucun résultat trouvé",
      resultsFound: "résultats trouvés",
    },
    actions: {
      readMore: "Lire l'article",
      playNow: "Écouter",
      viewPost: "Voir le post",
      watchTrailer: "Voir l'aperçu",
      addToFavorites: "Ajouter aux favoris",
      removeFromFavorites: "Retirer des favoris",
      share: "Partager",
      copied: "Lien copié dans le presse-papier !",
      reorderReset: "Réinitialiser l'ordre",
      loadMore: "Charger plus",
      refresh: "Actualiser",
      close: "Fermer",
      exportFavorites: "Exporter les favoris",
      clearAll: "Tout effacer",
      filterBy: "Filtrer par",
      sortBy: "Trier par",
      viewMode: "Mode d'affichage",
    },
    sort: {
      newest: "Plus récents",
      trending: "Plus populaires",
      topRated: "Mieux notés",
      mostDiscussed: "Plus commentés",
    },
    categories: {
      technology: "Technologie",
      sports: "Sports",
      finance: "Finance",
      entertainment: "Divertissement",
      science: "Science",
      health: "Santé",
      gaming: "Jeux vidéo",
      business: "Affaires",
    },
    sources: {
      news: "Actualités",
      recommendation: "Recommandation",
      social: "Réseaux Sociaux",
    },
    settings: {
      contentPreferences: "Sélection des Catégories",
      categoriesDesc: "Choisissez les thèmes à inclure dans votre flux.",
      sourcesTitle: "Sources Connectées",
      sourcesDesc: "Activez ou désactivez les flux de nouvelles et médias.",
      appearance: "Apparence et Disposition",
      darkMode: "Mode Sombre",
      density: "Style de Cartes",
      pagination: "Mode de Pagination",
      infiniteScroll: "Défilement Infini",
      paged: "Pages Numérotées",
      language: "Langue de l'interface",
      autoRefresh: "Mise à jour en temps réel",
      autoRefreshDesc: "Recevez automatiquement les alertes d'actualités.",
      resetAll: "Réinitialiser par défaut",
    },
    analytics: {
      readingStats: "Aperçu de la Consommation",
      articlesRead: "Articles Lus",
      favoritesSaved: "Favoris Enregistrés",
      topCategory: "Catégorie Principale",
      streakDays: "Jours Consécutifs",
      categoryBreakdown: "Répartition des Intérêts",
      sourceDistribution: "Répartition par Source",
    },
    auth: {
      profile: "Profil Utilisateur",
      login: "Se Connecter",
      logout: "Se Déconnecter",
      editProfile: "Modifier le Profil",
      guestUser: "Lecteur Invité",
      saveChanges: "Enregistrer",
    },
    realtime: {
      liveUpdates: "Activité en Direct",
      newStoriesAvailable: "nouvelles histoires disponibles. Cliquez pour charger",
      markAllRead: "Tout marquer comme lu",
      noNotifications: "Aucune nouvelle alerte",
    },
  },
  de: {
    appName: "Signal",
    tagline: "Ihr Personalisiertes Content-Dashboard",
    nav: {
      feed: "Feed",
      trending: "Trends",
      favorites: "Favoriten",
      analytics: "Statistiken",
      settings: "Einstellungen",
    },
    headers: {
      yourFeed: "Ihr Persönlicher Feed",
      feedDesc: "Nachrichten, Medienempfehlungen und Social-Posts nach Ihrem Geschmack.",
      trendingNow: "Aktuelle Trends",
      trendingDesc: "Die beliebtesten Beiträge und Empfehlungen im Moment.",
      favorites: "Gespeicherte Favoriten",
      favoritesDesc: "Ihre Lesezeichen für später.",
      analytics: "Lese-Einblicke & Statistiken",
      analyticsDesc: "Verfolgen Sie Ihr Leseverhalten und Themeninteressen.",
      settings: "Dashboard-Einstellungen",
      settingsDesc: "Kategorien, Datenquellen und Design individuell anpassen.",
      searchResults: "Suchergebnisse",
      searchDesc: "Ergebnisse über alle Quellen hinweg.",
    },
    search: {
      placeholder: "Nachrichten, Filme, Musik und Posts durchsuchen...",
      allSources: "Alle Quellen",
      recentSearches: "Letzte Suchanfragen",
      clear: "Löschen",
      noResults: "Keine Ergebnisse gefunden",
      resultsFound: "Ergebnisse gefunden",
    },
    actions: {
      readMore: "Weiterlesen",
      playNow: "Abspielen",
      viewPost: "Beitrag ansehen",
      watchTrailer: "Vorschau ansehen",
      addToFavorites: "Zu Favoriten hinzufügen",
      removeFromFavorites: "Aus Favoriten entfernen",
      share: "Teilen",
      copied: "Link in die Zwischenablage kopiert!",
      reorderReset: "Reihenfolge zurücksetzen",
      loadMore: "Mehr laden",
      refresh: "Aktualisieren",
      close: "Schließen",
      exportFavorites: "Favoriten exportieren",
      clearAll: "Alles löschen",
      filterBy: "Filtern nach",
      sortBy: "Sortieren nach",
      viewMode: "Ansichtsmodus",
    },
    sort: {
      newest: "Neueste zuerst",
      trending: "Beliebteste",
      topRated: "Bestbewertet",
      mostDiscussed: "Meistdiskutiert",
    },
    categories: {
      technology: "Technologie",
      sports: "Sport",
      finance: "Finanzen",
      entertainment: "Unterhaltung",
      science: "Wissenschaft",
      health: "Gesundheit",
      gaming: "Gaming",
      business: "Wirtschaft",
    },
    sources: {
      news: "Nachrichten",
      recommendation: "Empfehlung",
      social: "Social Media",
    },
    settings: {
      contentPreferences: "Kategorieauswahl",
      categoriesDesc: "Wählen Sie die Themen für Ihren täglichen Feed.",
      sourcesTitle: "Verbundene Quellen",
      sourcesDesc: "Nachrichten, Medien und Social Media aktivieren/deaktivieren.",
      appearance: "Design & Layout",
      darkMode: "Dunkelmodus",
      density: "Kartenstil",
      pagination: "Seiten-Navigation",
      infiniteScroll: "Endlos-Scrollen",
      paged: "Nummerierte Seiten",
      language: "Sprache",
      autoRefresh: "Echtzeit-Aktualisierung",
      autoRefreshDesc: "Eilmeldungen automatisch im Hintergrund empfangen.",
      resetAll: "Auf Standard zurücksetzen",
    },
    analytics: {
      readingStats: "Lese-Übersicht",
      articlesRead: "Gelesene Artikel",
      favoritesSaved: "Gespeicherte Favoriten",
      topCategory: "Hauptinteresse",
      streakDays: "Tage in Folge",
      categoryBreakdown: "Interessenverteilung",
      sourceDistribution: "Quellenaufteilung",
    },
    auth: {
      profile: "Benutzerprofil",
      login: "Anmelden",
      logout: "Abmelden",
      editProfile: "Profil bearbeiten",
      guestUser: "Gast-Leser",
      saveChanges: "Änderungen speichern",
    },
    realtime: {
      liveUpdates: "Live-Aktivitäten",
      newStoriesAvailable: "neue Beiträge verfügbar. Zum Laden klicken",
      markAllRead: "Alle als gelesen markieren",
      noNotifications: "Keine neuen Benachrichtigungen",
    },
  },
  ja: {
    appName: "Signal",
    tagline: "あなた専用のコンテンツダッシュボード",
    nav: {
      feed: "フィード",
      trending: "トレンド",
      favorites: "お気に入り",
      analytics: "アナリティクス",
      settings: "設定",
    },
    headers: {
      yourFeed: "あなた専用のフィード",
      feedDesc: "好みに合わせて厳選されたニュース、メディア推薦、SNS投稿。ドラッグして並べ替え可能。",
      trendingNow: "現在のトレンド",
      trendingDesc: "今もっとも注目されているニュースやコンテンツ。",
      favorites: "保存したお気に入り",
      favoritesDesc: "後で読むために保存したブックマーク一覧。",
      analytics: "読書インサイト & 分析",
      analyticsDesc: "コンテンツの閲覧履歴や興味分野の分析データ。",
      settings: "ダッシュボード設定",
      settingsDesc: "カテゴリー、データソース、ダークモードなどをカスタマイズ。",
      searchResults: "検索結果",
      searchDesc: "すべての連携ソースからの検索一致項目を表示しています。",
    },
    search: {
      placeholder: "ニュース、映画、音楽、投稿を検索...",
      allSources: "すべてのソース",
      recentSearches: "最近の検索",
      clear: "クリア",
      noResults: "検索結果が見つかりませんでした",
      resultsFound: "件の結果が見つかりました",
    },
    actions: {
      readMore: "記事を読む",
      playNow: "再生する",
      viewPost: "投稿を見る",
      watchTrailer: "予告を観る",
      addToFavorites: "お気に入りに保存",
      removeFromFavorites: "お気に入りから削除",
      share: "共有",
      copied: "リンクをクリップボードにコピーしました！",
      reorderReset: "順序をリセット",
      loadMore: "さらに読み込む",
      refresh: "更新",
      close: "閉じる",
      exportFavorites: "お気に入りをエクスポート",
      clearAll: "すべて削除",
      filterBy: "絞り込み",
      sortBy: "並べ替え",
      viewMode: "表示モード",
    },
    sort: {
      newest: "最新順",
      trending: "トレンド順",
      topRated: "高評価順",
      mostDiscussed: "コメント順",
    },
    categories: {
      technology: "テクノロジー",
      sports: "スポーツ",
      finance: "金融・経済",
      entertainment: "エンタメ",
      science: "科学",
      health: "健康・医療",
      gaming: "ゲーム",
      business: "ビジネス",
    },
    sources: {
      news: "ニュース速報",
      recommendation: "おすすめメディア",
      social: "ソーシャル",
    },
    settings: {
      contentPreferences: "カテゴリー選択",
      categoriesDesc: "日々のフィードに含めたいトピックを選択してください。",
      sourcesTitle: "接続データソース",
      sourcesDesc: "ニュースAPI、映画・音楽推薦、SNSフィードを切り替え。",
      appearance: "外観とレイアウト",
      darkMode: "ダークモード",
      density: "カード表示スタイル",
      pagination: "ページネーション方式",
      infiniteScroll: "無限スクロール",
      paged: "ページ番号表示",
      language: "表示言語",
      autoRefresh: "リアルタイム自動更新",
      autoRefreshDesc: "速報ニュースのアラートを自動でバッファに受信します。",
      resetAll: "初期設定に戻す",
    },
    analytics: {
      readingStats: "閲覧統計サマリー",
      articlesRead: "閲覧記事数",
      favoritesSaved: "保存アイテム数",
      topCategory: "最多興味分野",
      streakDays: "連続日数",
      categoryBreakdown: "興味カテゴリー分布",
      sourceDistribution: "ソース別割合",
    },
    auth: {
      profile: "ユーザープロフィール",
      login: "ログイン",
      logout: "ログアウト",
      editProfile: "プロフィール編集",
      guestUser: "ゲストユーザー",
      saveChanges: "変更を保存",
    },
    realtime: {
      liveUpdates: "リアルタイム速報",
      newStoriesAvailable: "件の新着記事があります。クリックして読み込む",
      markAllRead: "すべて既読にする",
      noNotifications: "新しい通知はありません",
    },
  },
};
