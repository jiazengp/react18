import React, { Component, Suspense } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

/**
 * @description Suspense
 * @link https://reactjs.org/docs/concurrent-mode-suspense.html
 * Suspense 可以让你的组件在渲染之前进行等待，并在等待时显示 FallBack 的内容
 * Suspense 内的组件子树比组件树的其他部分拥有更低的优先级
 * 执行流程：
 *    - 在 Render 函数中可以使用异步请求数据
 *    - React 会从我们缓存中读取这个缓存
 *    - 如果有缓存了，直接进行正常的 Render
 *    - 如果没有缓存，那么会抛出一个 Promise 异常
 *    - 当这个 Promise 完成后（比发请求数据完成），React 会继续回到原来的 render 中，把数据 Render 出来
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
      resolve({ success: true, data: { id, name: "张三" } });
      //reject({success:false,message:'获取数据发生了错误'});
    }, 1000);
  });
}

const initialResource = createResource(fetchData(1));

function User() {
  const result = initialResource.read();
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
      <ErrorBoundary fallback={<h1>Error</h1>}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <User />
        </Suspense>
      </ErrorBoundary>
    );
  }
}
