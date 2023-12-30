import { BlogCard } from "@/components";
import { Grotesk } from "@/app/font";

type Props = {
  relatedBlogs: BlogType[] | undefined;
};

const RelatedBlogs = (props: Props) => {
  return (
    <>
      {props.relatedBlogs && (
        <section className="flex_center gap-6 lg:gap-[50px]">
          <h2 className="text-[28px] font-medium " style={Grotesk.style}>
            Related Blogs
          </h2>

          <div className="blog_list_grid">
            {props.relatedBlogs.map((blog) => (
              <BlogCard key={blog._id} props={blog} rootUrl="/" />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedBlogs;
