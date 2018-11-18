export default [
  {
    name: '텍스트',
    list: [
      {
        name: 'A타입 (왼쪽)',
        fn: ({ addClip }) => {
          const input = prompt('시작할 지점을 입력하세요. (초)')
          const start = input && Number(input)
          const clip = {
            text: [
              'GOM MIX Pro',
              'Easily and quickly complete high-quality video'
            ],
            start,
            end: start + 3
          }
          Number.isInteger(start) && addClip({ type: 'text', clip })
        }
      }
    ]
  },
  {
    name: '필터',
    list: [
      {
        name: '모노크롬',
        fn: ({ editClip }, [key]) => {
          key &&
            editClip({ type: 'video', key, clip: { filter: 'monochrome' } })
        }
      }
    ]
  },
  {
    name: '영상 전환',
    list: [
      {
        name: '크로스페이드',
        fn: ({ editClip, addTransition }, [prev, next]) => {
          prev &&
            next &&
            (() => {
              editClip({
                type: 'video',
                key: next,
                clip: prev => ({ start: prev.start - 2, end: prev.end - 2 })
              })
              addTransition({ prev, next, name: 'crossFade' })
            })()
        }
      }
    ]
  }
]
