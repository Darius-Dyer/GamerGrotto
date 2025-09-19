import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

export const getGames = async () => {
  try {
    const response = await axios.get(
      "http://192.168.0.230:3000/api/games/search?s=Halo"
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error Fetching Game Data from Search API call:" + err);
  }
};

export const getGameDetails = () => {};

export const getGameScreenshots = () => {};

export const getGameAchievements = () => {};
