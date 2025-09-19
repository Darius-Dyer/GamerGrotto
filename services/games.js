import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

export const getGames = async (search) => {
  try {
    const response = await axios.get(
      `http://192.168.0.230:3000/api/games/search?search=${search}&search_exact=true`
    );
    console.log(response.data);
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Game Detail Data:" + error);
  }
};

export const getGameScreenshots = () => {};

export const getGameAchievements = () => {};
