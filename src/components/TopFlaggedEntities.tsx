import { Entity, formatKES, formatGap, riskSeverity } from "@/lib/data";
import { RiskBadge } from "./RiskBadge";
import { Link } from "react-router-dom";

interface TopFlaggedEntitiesProps {
  entities: Entity[];
}

export function TopFlaggedEntities({ entities }: TopFlaggedEntitiesProps) {
  const flagged = entities
    .filter((e) => e.risk_level !== "GREEN" && e.risk_level !== "INSUFFICIENT_DATA")
    .sort((a, b) => {
      const sev = riskSeverity(a.risk_level) - riskSeverity(b.risk_level);
      if (sev !== 0) return sev;
      return (Math.abs(b.gap_percent ?? 0)) - (Math.abs(a.gap_percent ?? 0));
    })
    .slice(0, 8);

  return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="font-display text-lg font-bold mb-4 text-card-foreground">Top Flagged Entities</h3>
      <div className="space-y-3">
        {flagged.map((entity) => (
          <Link
            key={entity.entity_id}
            to={`/entity/${entity.entity_id}`}
            className="flex items-center justify-between p-3 rounded-md border hover:bg-secondary/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-card-foreground truncate">{entity.display_name}</p>
              <p className="text-xs text-muted-foreground">
                {entity.entity_type === "party" ? "Party" : entity.county ?? ""}
                {entity.constituency ? ` • ${entity.constituency}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-3 ml-3 flex-shrink-0">
              <span className="text-sm font-mono text-muted-foreground">{formatGap(entity.gap_percent)}</span>
              <RiskBadge level={entity.risk_level} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
