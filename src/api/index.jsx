export const BASE_URL = "https://fitnesstrackr-ay.herokuapp.com/api";

//POST  /users/register
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    localStorage.setItem("token", JSON.stringify(data.token));
    return data;
  } catch (error) {
    throw error;
  }
};

//GET /users/login
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    localStorage.setItem("token", JSON.stringify(data.token));
    return data;
  } catch (error) {
    throw error;
  }
};

//GET /routines
export const getRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//GET /:username/routines
export const getAllRoutinesByUser = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//GET /activities
export const getActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//POST /activities
export const createActivity = async (name, description) => {
  try {
    const token = localStorage.getItem("token").replace(/['"]+/g, "");
    if (!token) return;
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//PATCH /:activityId
export const updateActivity = async (activityID, name, description) => {
  try {
    const token = localStorage.getItem("token").replace(/['"]+/g, "");
    if (!token) return;
    const response = await fetch(`${BASE_URL}/activities/${activityID}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//GET /:activityId/routines
export const getPublicRoutinesByActivity = async (activityID) => {
  try {
    const response = await fetch(
      `${BASE_URL}/activities/${activityID}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//GET /routines
export const getAllPublicRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//POST /routines
export const createNewRoutine = async ({ name, goal, isPublic }) => {
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//PATCH /routines/:routineId
export const updateRoutine = async (routineId, name, goal) => {
  try {
    const token = localStorage.getItem("token").replace(/['"]+/g, "");
    if (!token) {
      return;
    }
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: true,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//DELETE /routines/:routineId
export const deleteRoutine = async (routineId) => {
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// POST /routines/:routineId/activities
export const addActivityToRoutine = async (
  routineId,
  activityId,
  duration,
  count
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routines/${routineId}/activities`,
      {
        method: "POST",
        body: JSON.stringify({
          activityId: activityId,
          duration: duration,
          count: count,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//PATCH /routine_activities/:routineActivityId
export const updateRoutineActivity = async (
  routineActivityId,
  count,
  duration
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          count: count,
          duration: duration,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//DELETE /routine_activities/:routineActivityId
export const deleteRoutineActivity = async (routineActivityId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
