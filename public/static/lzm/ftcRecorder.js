class ftcRecorder{
    constructor(){
        this.stream = false;
        this.recorder = false;
        this.isRecording = false;
        this.videoData = false;
        this.onRecordData = false;
    }

    setVideo(videoDom){
        return new Promise((resolve, reject)=>{
            if(videoDom){
                if(videoDom.captureStream){
                    this.stream = videoDom.captureStream();
                    this.recorder = new MediaRecorder(this.stream);
                    this.recorder.ondataavailable = (e)=>{
                        this.videoData = e.data;
                        if(this.onRecordData) this.onRecordData(this.videoData);
                    };
                    resolve(this.recorder);
                }else if(videoDom.mozCaptureStream){
                    this.stream = videoDom.mozCaptureStream();
                    this.recorder = new MediaRecorder(this.stream);
                    this.recorder.ondataavailable = (e)=>{
                        this.videoData = e.data;
                        if(this.onRecordData) this.onRecordData(this.videoData);
                    };
                    resolve(this.recorder);
                }else{
                    reject("传入参数非正常的video标签！");
                }
            }else{
                reject("传入空的参数！");
            }
        });
    }

    start(){
        return new Promise((resolve, reject)=>{
            if(this.recorder == false) {
                reject("未执行setVideo！");
                return;
            }
            if(this.isRecording) {
                reject("已经执行过start!");
                return;
            }
            try{
                this.recorder.start();
                this.isRecording = true;
                resolve(this.recorder);
            }catch(err){
                this.isRecording = false;
                reject("video播放出现异常，无法启动录制！");
            }
        });
    }

    stop(){
        if(this.recorder == false) return;
        if(!this.isRecording) return;
        this.recorder.stop();
        this.isRecording = false;
    }
}