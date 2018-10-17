import VideoContext from 'videocontext'

export default canvas => ([video1, video2]) => {
  const videoCtx = new VideoContext(canvas)
  const videoNode1 = videoCtx.video(video1)
  videoNode1.start(0)
  videoNode1.stop(4)

  const videoNode2 = videoCtx.video(video2)
  videoNode2.start(2)
  videoNode2.stop(6)

  const crossFade = videoCtx.transition(VideoContext.DEFINITIONS.CROSSFADE)
  crossFade.transition(2, 4, 0.0, 1.0, 'mix')

  videoNode1.connect(crossFade)
  videoNode2.connect(crossFade)
  crossFade.connect(videoCtx.destination)

  videoCtx.play()
}
