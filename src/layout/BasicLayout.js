import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import pathToRegexp from "path-to-regexp";
import Authorized from "utils/Authorized";
import SiderMenu from "components/Menu/SiderMenu";
// import Exception403 from "pages/exception/403";
import Login from "pages/login/login";
import globalModel from "store/reducers/global";
import Header from "./Header";

const { Content } = Layout;

// Conversion router to menu.
function formatter(data, parentAuthority) {
  return data.map(item => {
    const result = {
      ...item,
      authority: item.authority || parentAuthority
    };
    if (item.routes) {
      const children = formatter(item.routes, item.authority);
      // Reduce memory usage
      result.children = children;
    }
    delete result.routes;
    return result;
  });
}

@connect(
  ({ global, user }) => {
    return { ...global, user };
  },
  {
    changeLayoutCollapsed: globalModel.actions["changeLayoutCollapsed"],
    setContainer: globalModel.actions["setContainer"]
  }
)
export default class BasicLayout extends React.PureComponent {
  breadcrumbNameMap = this.getBreadcrumbNameMap();

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  //找出当前路径下route配置
  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  //获取侧边菜单数据
  getMenuData() {
    const {
      route: { routes }
    } = this.props;
    console.log(this.props)
    
    return formatter(routes);
  }

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap
    };
  }

  handleMenuCollapse = collapsed => {
    const { changeLayoutCollapsed } = this.props;
    changeLayoutCollapsed(collapsed);
  };
 
  render() {
    const {
      route,
      logo,
      customHeader,
      className,
      children,
      location: { pathname },
      collapsed,
      authority, 
      user,
    } = this.props;
    console.log("authority", authority,pathname);
    const menuData = this.getMenuData();
    const routerConfig = this.matchParamsPath(pathname);
    console.log(this.props.openKeys, "basicLayoutOpenkeys",menuData,'routerConfig',routerConfig);
    //写死的
    user.roles="admin"
    return (
      <Layout className={className}>
        <SiderMenu
          logo={logo}
          theme={"dark"}
          // collapsed={collapsed}
          userAuth={user.roles}
          onCollapse={this.handleMenuCollapse}
          menuData={menuData}
          {...this.props}
        />
        <Layout
          style={{
            // ...this.getLayoutStyle(),
            backgroundColor: "#fff",
            minHeight: "100vh"
          }}
          className="layout-content"
        >
        {/* 临时注释掉 */}
          {/* <Header
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            customHeader={customHeader}
            {...this.props}
          /> */}
          <Content
            style={
              {
                // ...this.getContentStyle()
              }
            }
            ref={this.saveContainer}
          >
           <div />
            <Authorized
              authority={routerConfig.authority}
              // noMatch={<Exception403 />}
              noMatch={<Login />}
            >
              {children}
            </Authorized>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
