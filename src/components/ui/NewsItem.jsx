import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const NewsItem = ({ title, by, score, url }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
            {title}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          By {by} | Score: {score}
        </p>
      </CardContent>
    </Card>
  );
};

export default NewsItem;