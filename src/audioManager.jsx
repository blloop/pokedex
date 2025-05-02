class AudioManager {
  constructor() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.soundBuffers = {};
  }

  async loadSound(name, url) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.soundBuffers[name] = audioBuffer;
    } catch (error) {
      console.error(`Failed to load sound "${name}" from ${url}:`, error);
    }
  }

  playSound(name) {
    const buffer = this.soundBuffers[name];
    if (!buffer) {
      console.warn(`Sound "${name}" not found or not loaded yet.`);
      return;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}

const audioManager = new AudioManager();
export default audioManager;
