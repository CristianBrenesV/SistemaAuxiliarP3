interface Props {
  title: string;
  value: number | string;
  icon: string;
}

export default function StatsCard({ title, value, icon }: Props) {
  return (
    <div className="col-md-3 mb-3">
      <div className="card shadow-sm text-center">
        <div className="card-body">
          
          <i className={`bi ${icon} fs-2 mb-2`}></i>

          <h6>{title}</h6>
          <h4>{value}</h4>

        </div>
      </div>
    </div>
  );
}