export default [
  {
    type: 'text',
    name: '텍스트',
    list: [
      {
        name: 'A타입 (왼쪽)',
        getClip: start => ({
          text: [
            'GOM MIX Pro',
            'Easily and quickly complete high-quality video'
          ],
          start,
          end: start + 3
        })
      }
    ]
  },
  {
    type: 'filter',
    name: '필터',
    list: [
      {
        name: '모노크롬',
        clip: { filter: 'monochrome' }
      }
    ]
  },
  {
    type: 'transition',
    name: '영상 전환',
    list: [
      {
        name: '크로스페이드',
        clip: ({ start, end }) => ({ start: start - 2, end: end - 2 })
      }
    ]
  }
]
