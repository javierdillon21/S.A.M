/**
 * Generic loading indicator for the app.
 * */
export default function SpinnerLoading(props: { style?: string }) {
  return (
    <svg
      className={
        props.style ||
        "self-center w-16 h-16 animate-spin stroke-current text-blue-700"
      }
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        /* stroke="#1783e5" */
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="matrix(1,0,0,1,0,0)"
      ></circle>
    </svg>
  );
}
