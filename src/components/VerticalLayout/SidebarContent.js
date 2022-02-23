import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { connect, useStore } from 'react-redux';
import { all, call, fork, takeEvery, put } from "redux-saga/effects"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from 'store/actions';

const SidebarContent = props => {
  const currentUser = JSON.parse(localStorage.getItem("authUser"));
  const isAdmin = currentUser.isAdmin ? true : false;
  const location = useLocation()
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  // TODO: Track the screen size.

  const closeMenuOnClick = () => {
    console.log("Click happens here!")
    if (window.innerWidth <= 992) props.changeSidebarType("condensed", isMobile)
  }

  useEffect(() => {
    function handleResize() {
      setScreenWidth((prevState) => {
        if (prevState < 992 && window.innerWidth > 992) {
          props.changeSidebarType("default", isMobile)
        }

        if (prevState > 992 && window.innerWidth < 992) {
          props.changeSidebarType("condensed", isMobile);
        }
        return window.innerWidth
      });
    }

    window.addEventListener('resize', handleResize)
  })

  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {/* CLIENT MENU */}
            {!isAdmin && (
              <>
                <li className="menu-title">{props.t("CLIENT MENU")} </li>

                <li>
                  <Link to="/client-dashboard" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bx-home-circle"></i>
                    <span>{props.t("Dashboard")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/profile" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bx-user"></i>
                    <span>{props.t("Profile")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/client-bank-details" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bxs-bank"></i>
                    <span>{props.t("Bank Details")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/client-my-account" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bx-money"></i>
                    <span>{props.t("Portfolio")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/client-available-investments" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bx-folder-open"></i>
                    <span>{props.t("Bonds")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/client-private-equity" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bx-dollar-circle"></i>
                    <span>{props.t("Private Equity")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/client-request-deposit" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bx-transfer"></i>
                    <span>{props.t("Deposit Request")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/client-request-withdrawal" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bx-transfer"></i>
                    <span>{props.t("Withdrawal Request")}</span>
                  </Link>

                </li>

                <li>
                  <Link to="/logout" className="waves-effect">
                    <i className="bx bx-log-out"></i>
                    <span>{props.t("Logout")}</span>
                  </Link>
                </li>
              </>
            )}
            {/* CLIENT MENU */}

            {/* ADMIN MENU */}
            {isAdmin && (
              <>
                <li className="menu-title">{props.t("ADMIN MENU")} </li>

                <li>
                  <Link to="/admin-dashboard" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bx-home-circle"></i>
                    <span>{props.t("Dashboard")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="bx bx-user"></i>
                    <span>{props.t("Clients")}</span>
                  </Link>

                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/admin-clients" onClick={() => closeMenuOnClick()}>{props.t("View Clients")}</Link>
                    </li>
                    <li>
                      <Link to="/admin-new-client" onClick={() => closeMenuOnClick()}>{props.t("Client Form")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="bx bx-money"></i>
                    <span>{props.t("Deposits")}</span>
                  </Link>

                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/admin-deposits" onClick={() => closeMenuOnClick()}>{props.t("View Deposits")}</Link>
                    </li>
                    <li>
                      <Link to="/admin-new-deposit" onClick={() => closeMenuOnClick()}>{props.t("Deposit Form")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="bx bx-archive"></i>
                    <span>{props.t("Bonds")}</span>
                  </Link>

                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/admin-products" onClick={() => closeMenuOnClick()}>{props.t("View Products")}</Link>
                    </li>
                    <li>
                      <Link to="/admin-new-product" onClick={() => closeMenuOnClick()}>{props.t("Product Form")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="bx bx-drink"></i>
                    <span>{props.t("Purchased Bonds")}</span>
                  </Link>

                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/admin-trades" onClick={() => closeMenuOnClick()}>{props.t("View Purchased Bonds")}</Link>
                    </li>
                    <li>
                      <Link to="/admin-new-trade" onClick={() => closeMenuOnClick()}>{props.t("Trade Form")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="bx bx-mail-send"></i>
                    <span>{props.t("IPOs")}</span>
                  </Link>

                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/admin-ipos" onClick={() => closeMenuOnClick()}>{props.t("View IPOs")}</Link>
                    </li>
                    <li>
                      <Link to="/admin-new-ipo" onClick={() => closeMenuOnClick()}>{props.t("New IPO")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="bx bx-money"></i>
                    <span>{props.t("Purchased IPOs")}</span>
                  </Link>

                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/admin-purchased-ipos" onClick={() => closeMenuOnClick()}>{props.t("View IPO Purchases")}</Link>
                    </li>
                    <li>
                      <Link to="/admin-new-purchased-ipo" onClick={() => closeMenuOnClick()}>{props.t("Edit IPO Purchase")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="bx bx-money"></i>
                    <span>{props.t("User Sales")}</span>
                  </Link>

                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/admin-sales" onClick={() => closeMenuOnClick()}>{props.t("View User Sales")}</Link>
                    </li>
                    <li>
                      <Link to="/admin-new-sale" onClick={() => closeMenuOnClick()}>{props.t("Edit User Sales")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="bx bx-mail-send"></i>
                    <span>{props.t("Send Payment Details")}</span>
                  </Link>

                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/admin-send-payment-details" onClick={() => closeMenuOnClick()}>{props.t("View Sent Payment Details")}</Link>
                    </li>
                    <li>
                      <Link to="/admin-new-payment-details" onClick={() => closeMenuOnClick()}>{props.t("Send Payment Details")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/profile" className="waves-effect" onClick={() => closeMenuOnClick()}>
                    <i className="bx bx-user"></i>
                    <span>{props.t("Profile")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/logout" className="waves-effect">
                    <i className="bx bx-log-out"></i>
                    <span>{props.t("Logout")}</span>
                  </Link>
                </li>
              </>
            )}
            {/* ADMIN MENU */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(SidebarContent))

// export default withRouter(withTranslation()(SidebarContent))

