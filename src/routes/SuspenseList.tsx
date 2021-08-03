import React, { Component, Suspense, SuspenseList } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

/**
 * @description SuspenseList
 * 通过编排向用户显示这些组件的顺序，来帮助协调许多可以挂起的组件。
 * revealOrder (forwards, backwards, together) 定义了 SuspenseList 子组件应该显示的顺序
 *    together 在所有的子组件都准备好了的时候显示它们，而不是一个接着一个显示。
 *    forwards 从前往后显示。
 *    backwards 从后往前显示。
 *
 * tail (collapsed, hidden) 指定如何显示 SuspenseList 中未加载的项目
 *    默认情况下，SuspenseList 将显示列表中的所有 fallback
 *    collapsed 仅显示列表中下一个 fallback
 *    hidden 未加载的项目不显示任何信息
 */

function createResource(promise: Promise<any>) {
  let status = "pending";
  let result: any;
  return {
    read() {
      if (status === "success" || status === "error") {
        return result;
      } else {
        throw promise.then(
          (data: any) => {
            status = "success";
            result = data;
          },
          (error: any) => {
            status = "error";
            result = error;
          }
        );
      }
    },
  };
}

function fetchData(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, data: { id, name: "姓名" + id } });
      //reject({success:false,message:'获取数据发生了错误'});
    }, 1000 * id);
  });
}

let userResourceMap: any = {
  1: createResource(fetchData(1)),
  2: createResource(fetchData(2)),
  3: createResource(fetchData(3)),
};

interface UserProps {
  id: number;
}

function User(props: UserProps) {
  const result = userResourceMap[props.id].read();
  if (result.success) {
    let user = result.data;
    return (
      <p>
        {user.id}:{user.name}
      </p>
    );
  } else {
    return <p>{result.message}</p>;
  }
}

export default class extends Component {
  render() {
    return (
      <ErrorBoundary fallback={<h1>出错了</h1>}>
        <SuspenseList revealOrder="backwards" tail="collapsed">
          <Suspense fallback={<h1>加载用户3......</h1>}>
            <User id={3} />
          </Suspense>
          <Suspense fallback={<h1>加载用户2......</h1>}>
            <User id={2} />
          </Suspense>
          <Suspense fallback={<h1>加载用户1......</h1>}>
            <User id={1} />
          </Suspense>
        </SuspenseList>
      </ErrorBoundary>
    );
  }
}
