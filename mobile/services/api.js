import axios from "axios";
import { AsyncStorage } from "react-native";
require('dotenv').config();

// API pour SoundCloud
const clientId = process.env.SOUNDCLOUD_CLIENT_ID;
const baseUrl = 'https://api.soundcloud.com';

// API pour l'application mobile(hors authentification)
const API_URL = "https://api.calinsdusoir.com";

// API pour l'authentification
const AUTH_URL = "https://api.calinsdusoir.com/auth";


//#region Authentification
// Fonction pour récupérer les informations de l'utilisateur
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

// Fonction pour enregistrer un utilisateur
export const register = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
  }
}
//#endregion

//#region Histoires
// Fonction pour récupérer les histoires
export const getStories = async () => {
  try {
    const response = await axios.get(`${API_URL}/stories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
  }
};

export const getStory = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching story:", error);
  }
}

export const getComments = async (storyId) => {
  try {
    const response = await axios.get(`${API_URL}/stories/${storyId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

export const postComment = async (storyId, comment) => {
  try {
    const response = await axios.post(`${API_URL}/stories/${storyId}/comments`, comment);
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

export const getChapters = async (storyId) => {
  try {
    const response = await axios.get(`${API_URL}/stories/${storyId}/chapters`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }
};

export const getChapter = async (storyId, chapterId) => {
  try {
    const response = await axios.get(`${API_URL}/stories/${storyId}/chapters/${chapterId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapter:", error);
  }
};
//#endregion

//#region SoundCloud API
export const getTracks = async () => {
  try {
    const response = await axios.get(`${baseUrl}/tracks?client_id=${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tracks:", error);
  }
};

export const getTrack = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/tracks/${id}?client_id=${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching track:", error);
  }
};

export const searchTracks = async (query) => {
  try {
    const response = await axios.get(`${baseUrl}/tracks?q=${query}&client_id=${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error searching tracks:", error);
  }
};

export const getPlaylists = async () => {
  try {
    const response = await axios.get(`${baseUrl}/playlists?client_id=${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
  }
};

export const getPlaylist = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/playlists/${id}?client_id=${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
};

export const searchPlaylists = async (query) => {
  try {
    const response = await axios.get(`${baseUrl}/playlists?q=${query}&client_id=${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error searching playlists:", error);
  }
};
//#endregion