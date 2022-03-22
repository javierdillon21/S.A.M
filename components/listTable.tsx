import { useRouter } from "next/router";
import { useContext } from "react";

/**
 * If no `TableHeader` is provided, the headers
 * are taken from the first element of the data array.
 */
export default function ListTable<T>(props: {
  data: T[];
  tableHeaders?: string[];
  hideIndexes?: number[];
  onClick?: Function;
}) {
  let tableHeaders: string[] = props.tableHeaders || Object.keys(props.data[0]);
  const router = useRouter();
  if (props.hideIndexes)
    tableHeaders = tableHeaders.filter(
      (_, i) => !props.hideIndexes?.includes(i)
    );

  return (
    <>
      <table className={`table-auto text-sm lowercase xsm:normal-case`}>
        <thead>
          <tr>
            {tableHeaders.map((headerText) => (
              <th
                key={`headerList-${headerText}`}
                className="sm:px-4 py-1 px-1 mx-0 sm:py-2"
              >
                {headerText}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {props.data.map((element: T, index1: number) => (
            <tr
              key={`list-${index1}`}
              className={`cursor-pointer`}
              // onClick={() =>
              //   // The first property of `element` is the ID
              //   // We route to the id page, from our current
              //   // location. e.g: /pages/clientes -> /pages/clientes/022
              //   router.push(`${router.pathname}/${Object.values(element)[0]}`)
              // }
              onClick={
                props.onClick == undefined
                  ? () =>
                      router.push(
                        `${router.pathname}/${Object.values(element)[0]}`
                      )
                  : () =>
                      props.onClick && props.onClick(Object.values(element)[0])

                // () =>
                //     router.push(
                //       `${router.pathname}/${Object.values(element)[0]}`
                //     )
              }
            >
              {Object.values(element).map((value, index2) => {
                if (
                  props.hideIndexes !== undefined &&
                  props.hideIndexes.includes(index2)
                )
                  return undefined;
                return (
                  <td
                    key={`cellList-${index1}-${index2}`}
                    className={`break-words md:break-normal sm:px-4 py-1 sm:py-2`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
