import React from "react";

const songs = [
  { id: "2dKMNZIK45M", title: "ROSALÍA - Berghain", artist: "Rosalía" },
  { id: "w7pjt9ZH3NM", title: "ROSALÍA - La Perla", artist: "Rosalía" },
  { id: "JseJETvMtHY", title: "Bad Bunny - BAILE INoLVIDABLE", artist: "Bad Bunny" },
  { id: "DlFXDl_ROAM", title: "Lady Gaga, Bruno Mars - Die With A Smile", artist: "Lady Gaga" },
  { id: "AeKd-SVxh74", title: "Lady Gaga - Vanish Into You", artist: "Lady Gaga" },
  { id: "m8TTEuUzQUQ", title: "Yuridia - Con Toda Libertad", artist: "Yuridia" },
  { id: "9bGFko9SM0M", title: "Chayanne - Veo en ti la luz", artist: "Chayanne" },
  { id: "ETJcV3rPO_U", title: "Miranda! - Tu Misterioso Alguien", artist: "Miranda!" },
  { id: "LoUgRNpEgKE", title: "Enjambre - Dulce Soledad", artist: "Enjambre" },
  { id: "A9WHpDefTsw", title: "Beéle - Loco", artist: "Beéle" },
  { id: "Cr8K88UcO0s", title: "Bad Bunny - Tití Me Preguntó", artist: "Bad Bunny" },
  { id: "5g2hT4GmAGU", title: "ROSALÍA - DESPECHÁ", artist: "Rosalía" },
  { id: "_5-QkAVRkqU", title: "Lady Gaga - Bad Romance", artist: "Lady Gaga" }
];

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "2rem",
  padding: "2rem",
  maxWidth: "1200px",
  margin: "0 auto"
};

const cardStyle = {
  background: "rgba(255,255,255,0.10)",
  borderRadius: "1.25rem",
  boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.18)",
  backdropFilter: "blur(6px)"
};

const iframeStyle = {
  width: "100%",
  height: "200px",
  border: "none",
  borderRadius: "1.25rem 1.25rem 0 0",
  background: "#000"
};

const infoStyle = {
  padding: "1rem",
  width: "100%",
  textAlign: "center"
};

const titleStyle = {
  fontWeight: "bold",
  fontSize: "1.1rem",
  color: "#fff",
  marginBottom: "0.25rem"
};

const artistStyle = {
  color: "#FFD700",
  fontSize: "1rem",
  fontWeight: "500"
};

const Playlist = () => (
  <section style={{ width: "100%", minHeight: "100vh", background: "none" }}>
    <h2 style={{
      textAlign: "center",
      color: "#fff",
      fontSize: "2.2rem",
      fontWeight: "bold",
      margin: "2rem 0 1rem 0",
      letterSpacing: "0.02em"
    }}>
      🎶 Playlist Especial
    </h2>
    <div style={gridStyle}>
      {songs.map(song => (
        <div key={song.id} style={cardStyle}>
          <iframe
            style={iframeStyle}
            src={`https://www.youtube.com/embed/${song.id}`}
            title={song.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div style={infoStyle}>
            <div style={titleStyle}>{song.title}</div>
            <div style={artistStyle}>{song.artist}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Playlist;
