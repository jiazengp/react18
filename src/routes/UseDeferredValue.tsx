import React, {
  startTransition,
  useEffect,
  useState,
  useDeferredValue,
} from "react";

/**
 * @description useDeferredValue
 * 返回一个延迟响应的值
 * 在 useDeferredValue 内部会调用 useState 并触发一次更新,但此更新的优先级很低。
 */

function getSuggestions(keyword: string): Promise<Array<string>> {
  let items = new Array(10000)
    .fill(0)
    .map((item: number, index: number) => keyword + index);
  return Promise.resolve(items);
}

interface SuggestionProps {
  keyword: string;
}

function Suggestion(props: SuggestionProps) {
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  useEffect(() => {
    getSuggestions(props.keyword).then((suggestions) => {
      setSuggestions(suggestions);
    });
  }, [props.keyword]);

  return (
    <ul>
      {suggestions.map((item: string) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function () {
  const [keyword, setKeyword] = useState("");
  const deferredText = useDeferredValue(keyword);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  return (
    <div>
      请输入商品关键字
      <input value={keyword} onChange={handleChange} />
      <Suggestion keyword={deferredText} />
    </div>
  );
}
