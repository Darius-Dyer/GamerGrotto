import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

export const getGames = async (search) => {
  try {
    const response = await axios.get(
      `http://192.168.0.230:3000/api/games/search?search=${search}&search_precise=true`
    );
    //console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error Fetching Game Data from Search API call:" + err);
  }
};

export const getGameDetails = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.0.230:3000/api/games/details?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error Fetching Game Detail Data:" + error);
  }
};

export const getGameScreenshots = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.0.230:3000/api/games/screenshots?game_pk=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error Fetching Game Screenshots:" + error);
  }
};

export const getGameAchievements = async (id, page) => {
  try {
    const response = await axios.get(
      `http://192.168.0.230:3000/api/games/achievements?id=${id}&page=${page}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Game Achievements: " + error);
  }
};
