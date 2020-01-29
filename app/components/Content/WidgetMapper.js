import { Button, Card, GU, IconArrowDown, IconArrowLeft, IconArrowRight, IconArrowUp, SidePanelSeparator, textStyle } from '@aragon/ui'
import PropTypes from 'prop-types'
import React from 'react'

import MarkdownPreview from '../Widget/Markdown/Preview'
import Votes from '../Widget/Votes/Votes'
import { useEditMode } from '../../context/Edit'

// TODO: encode this in types constant along with widgetSelect
const LABELS = {
  ACTIVITY: 'Activity feed',
  DOT_VOTES: 'Latest dot votes',
  MARKDOWN: 'Custom content',
  VOTES: 'Latest votes',
}

const HeaderArrows = () => {
  return (
    <>
    <Button
      css={`
      margin-right: ${GU}px;
    `}
      disabled
      display="icon"
      icon={<IconArrowLeft />}
      label="Move to primary column"
      onClick={() => {}}
    />
  <Button
    css={`
      margin-right: ${GU}px;
    `}
    disabled
    display="icon"
    icon={<IconArrowUp />}
    label="Move up"
    onClick={() => {}}
  />
  <Button
    css={`
      margin-right: ${GU}px;
    `}
    display="icon"
    icon={<IconArrowDown />}
    label="Move down"
    onClick={() => {}}
  />
  <Button
    display="icon"
    icon={<IconArrowRight />}
    label="Move to secondary column"
    onClick={() => {}}
  />
  </>
  )
}

// TODO: Read from grid CSS or generated layout mapping to dynamically show/hide buttons
const WidgetHeader = ({ type }) => {
  const { editMode } = useEditMode()
  const label = LABELS[type]
  return (
    <>
      <div
        css={`
          display: flex;
          flex: 0 0 ${5 * GU}px;
          align-items: center;
          ${textStyle('body1')}
        `}
      >
        <span css='flex: 1 0 auto'>{label}</span>
        {false && editMode && <HeaderArrows />}
      </div>
      <SidePanelSeparator
        css={`
          margin: ${3 * GU}px -${3 * GU}px;
        `}
      />
    </>
  )
}

WidgetHeader.propTypes = {
  // TODO: adjust to exact types
  type: PropTypes.oneOf(Object.keys(LABELS)).isRequired,
}

const Widget = ({ children, type, ...props }) => {
  const { editMode } = useEditMode()
  return (
    <Card css={`
      align-items: stretch;
      display: flex;
      flex-direction: column;
      height: auto;
      justify-content: center;
      overflow: hidden;
      padding: ${2.25 * GU}px ${3 * GU}px ${3 * GU}px;
      width: auto;
      margin-bottom: ${3 * GU}px;
      &.sortable-ghost {
        background-color: #f9fafc;
        opacity: .8;
      }
  `}>
      {(type !== 'MARKDOWN' || editMode) && <WidgetHeader type={type} />}
      {children && React.cloneElement(children, props)}
    </Card>
  )
}

Widget.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.exact({
    primary: PropTypes.bool,
    wide: PropTypes.bool,
  }),
  // TODO: adjust to exact types
  type: PropTypes.string,
}

const WidgetContent = ({ data, type }) => {
  switch (type) {
  case 'MARKDOWN':
    return <MarkdownPreview content={data} />
  case 'VOTES':
    return <Votes />
  }
}

WidgetContent.propTypes = {
  data: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  // TODO: adjust to exact types
  type: PropTypes.string,
}

const WidgetMapper = ({ data, id, layout, type }) => {
  // TODO: better uuid for key
  return (
    <Widget key={id} layout={layout} type={type}>
      <div css={'flex: 1 0 auto;'}>
        <WidgetContent data={data} type={type} />
      </div>
    </Widget>
  )
}

WidgetMapper.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  layout: PropTypes.exact({
    primary: PropTypes.bool,
    wide: PropTypes.bool,
  }).isRequired,
  type: PropTypes.oneOf(Object.keys(LABELS)).isRequired
}

export default WidgetMapper