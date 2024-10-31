async function handleAuth(payload) {
  try {
    const response = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error({ message: "Failed to authenticate user" });
    }

    const resData = await response.json();

    return resData;
  } catch (err) {
    return err;
  }
}

export { handleAuth };
