class TextToSpeechPlayer {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.voices = [];
        this.initialize();
    }
  
    initialize() {
        // Lấy danh sách giọng đọc
        if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
        } else {
        this.loadVoices();
        }
    }
    
    loadVoices() {
        this.voices = this.synth.getVoices();
    }
    
    speak(text) {
        // Dừng bất kỳ âm thanh đang phát
        this.stop();
        
        // Tạo utterance mới
        this.utterance = new SpeechSynthesisUtterance(text);
        
        // Áp dụng các tùy chọn
        const defaults = {
        lang: 'ja-JP',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        voice: null
        };
        
        const settings = { ...defaults};
        
        Object.keys(settings).forEach(setting => {
        if (setting === 'voice' && settings.voice) {
            // Tìm giọng đọc theo tên hoặc ngôn ngữ nếu được cung cấp
            if (typeof settings.voice === 'string') {
            const selectedVoice = this.voices.find(v => 
                v.name === settings.voice || v.lang === settings.voice
            );
            if (selectedVoice) this.utterance.voice = selectedVoice;
            } else {
            this.utterance.voice = settings.voice;
            }
        } else {
            this.utterance[setting] = settings[setting];
        }
        });
        
        
        // Phát âm thanh
        this.synth.speak(this.utterance);
        return this;
    }
    
    stop() {
        this.synth.cancel();
        return this;
    }
    
    getVoices() {
        return this.voices;
    }
}

// Sử dụng
const tts = new TextToSpeechPlayer();