import React from "react";

export function DefaultErrorPage(e: any) {
  return (
    <div>
      <h1 style={{ fontSize: "3rem", color: "red" }}>An error happened</h1>
      <p style={{ fontSize: "1.5rem" }}>{Object.values(e).toString()}</p>
    </div>
  );
}

export function DefaultNotFoundPage() {
  return (
    <div>
      <h1 style={{ fontSize: "3rem" }}>Not found</h1>
      <p style={{ fontSize: "1.5rem" }}>The page you are looking for does not exist</p>
    </div>
  );
}
