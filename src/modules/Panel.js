import React from 'react'
import Tab from '../layout/Tab'
import Assets from '../modules/Assets'
import EffectList from '../modules/EffectList'

const Effects = [
  {
    name: '텍스트',
    list: [
      {
        name: 'A타입 (왼쪽)',
        fn: addTimeline => {
          const start = Number(prompt('시작할 지점을 입력하세요. (초)'))
          const clip = {
            text: [
              'GOM MIX Pro',
              'Easily and quickly complete high-quality video'
            ],
            start,
            end: start + 3
          }
          addTimeline({ type: 'text', clip })
        }
      }
    ]
  },
  { name: '필터', list: [{ name: '필터 1', fn: () => {} }] },
  { name: '영상 전환', list: [{ name: '크로스페이드', fn: () => {} }] }
]

const Panel = () => (
  <Tab
    list={[
      { name: '미디어 소스', component: <Assets /> },
      ...Effects.map(({ name, list }) => ({
        name,
        component: <EffectList list={list} />
      }))
    ]}
  />
)

export default Panel
