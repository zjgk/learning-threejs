/**
 * Created by common on 2017/9/22.
 */
import React, {Component} from 'react'
/**
 * 懒加载组件
 */
class Bundle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null
    }
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    });
    props.load().then((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

export default (load) => {
  return (props) =>
    <Bundle load={load}>
      {(Component) => <Component {...props}/>}
    </Bundle>
}
