export default function TopicDescriptor({description}) {
  if (description) return <h3 className="topic-descriptor">{description}</h3>
  else return <h3 className="topic-descriptor">Current articles</h3>
}