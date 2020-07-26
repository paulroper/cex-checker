declare module 'play-sound' {
  interface Player {
    play: (filePath: string) => void;
  }

  function player(): Player;
  export default player;
}
