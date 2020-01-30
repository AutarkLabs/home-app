import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { GU, RADIUS, textStyle, useSidePanel, useTheme } from '@aragon/ui'

import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'

import cmResize from '../../../utils/codemirror/cm-resize'

const editorOptions = {
  lineWrapping: true,
  mode: 'gfm',
  scrollbarStyle: 'overlay', // depends on simplescrollbars codemirror addon
}


// TODO: Dark mode needs fixing here
const Editor = ({ editor, initialValue, onChange, setEditor, ...props }) => {
  const [ , setValue ] = useState(initialValue)

  const ref = useRef()

  const { readyToFocus } = useSidePanel()
  const theme = useTheme()
  // initialize editor
  useEffect(() => {
    const setupCodeMirror = async () => {
      const { current: textarea } = ref

      if (!textarea) {
        return
      }

      const cm = CodeMirror.fromTextArea(textarea, editorOptions)
      cm.on('change', instance => {
        const value = instance.getValue()
        onChange(value)
      })
      cmResize(cm, {
        minHeight: 100,
        resizableWidth: false,
      })
      // TODO: Clean event handlers on exit
      setEditor(cm)
    }

    setupCodeMirror()

    return () => {
      if (!editor) {
        return
      }

      editor.toTextArea()
    }
  }, [ editor, onChange, ref, setEditor ])

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  // useEffect(() => {
  //   if (!editor) {
  // return
  // }
  // if (value !== editor.getValue()) {
  //     editor.setValue(value)
  //   }
  // }, [editor, value])

  useEffect(() => {
    if (readyToFocus && editor) {
      editor.focus()
      // move cursor to the end
      editor.setCursor(editor.lineCount(), 0)
    }
  }, [ editor, readyToFocus ])

  return (
    <div
      css={`
        flex: 1 1 100%;
        margin-bottom: ${3 * GU}px;
        .CodeMirror {
          border: 1px solid ${theme.border};
          border-radius: ${RADIUS}px;
          color: ${theme.surfaceContent};
          font-family: aragon-ui, sans-serif;
          overflow: hidden;
          padding: ${1 * GU}px;
          ${textStyle('body3')};
        }
        .CodeMirror-wrap {
          height: ${22 * GU}px
        }
        .cm-resize-handle {
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: 99;
          width: 12px;
          height: 12px;
          background: url("data:image/svg+xml;charset=utf8,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='4.64645' y1='9.64645' x2='9.64645' y2='4.64645' stroke='%23C4CDD5'/%3E%3Cline x1='0.646447' y1='9.64645' x2='9.64645' y2='0.646447' stroke='%23C4CDD5'/%3E%3C/svg%3E")
            center/cover;
          cursor: ns-resize;
        }
      `}
    >
      <textarea
        readOnly
        ref={ref}
        css={`
          display: none;
        `}
        value={initialValue}
        {...props}
      />
    </div>
  )
}

Editor.propTypes = {
  editor: PropTypes.func.isRequired,
  initialValue:PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  setEditor: PropTypes.func.isRequired,
}

export default Editor
