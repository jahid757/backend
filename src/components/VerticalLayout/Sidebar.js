import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { changeSidebarType } from 'store/actions';
 
//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

const Sidebar = props => {
  useEffect(() => {
    if (window.innerWidth < 992) {
      if (document.body.classList.contains("mobileChange")) {
      } else {
        props.changeSidebarType("condensed");
      }
    }
  }, [props.layout.leftSideBarType])


  return (
    <React.Fragment>
      <div className="vertical-menu sideVisible">
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(
  mapStatetoProps,
  {changeSidebarType}
)(withRouter(withTranslation()(Sidebar)))
