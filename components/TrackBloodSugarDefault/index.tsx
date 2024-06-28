import Link from "next/link";
import Icon from "@/components/Icon";

type NavigationItem = {
  title: string;
  icon: string;
  color: string;
  url: string;
  bgColor: string;
};

type ServicesProps = {
  navigation: NavigationItem[];
};

const TrackBloodSugarDefault = ({ navigation }: ServicesProps) => (
  <div className="mb-4 p-4 border rounded bg-gray-100">
    <h2 className="mb-4 text-lg font-semibold">I&apos;m FreeStyle</h2>
    <p className="mb-4">
      I can help you analyze your glucose monitoring data. Here is a link to
      your data:
    </p>
    <div className="flex flex-wrap -mt-2 -ml-2">
      {navigation.map((item, index) => (
        <Link
          className="group flex items-center mt-2 ml-2 p-2 pr-4 border border-n-3 bg-n-1 rounded-full base1 font-semibold transition-shadow hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0_2rem_2rem_-1rem_rgba(0,0,0,0.12)] md:w-full dark:border-n-5/50 dark:bg-n-6 dark:transition-all dark:hover:bg-n-5"
          href={item.url}
          key={index}
        >
          <div className="relative flex justify-center items-center w-10 h-10 mr-3">
            <div
              className="absolute inset-0 opacity-20 rounded-full"
              style={{
                backgroundColor: item.bgColor,
              }}
            ></div>
            <Icon className="relative z-1" fill={item.color} name={item.icon} />
          </div>
          {item.title}
        </Link>
      ))}
    </div>
    <p className="mt-4">
      Feel free to ask me questions about your data, such as:
    </p>
    <ul className="list-disc pl-6 mt-2">
      <li>When did my glucose value peak in the most recent two weeks?</li>
      <li>What was my average glucose value over the last month?</li>
    </ul>
  </div>
);

export default TrackBloodSugarDefault;
