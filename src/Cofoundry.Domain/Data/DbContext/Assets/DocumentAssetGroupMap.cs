using Cofoundry.Core;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Cofoundry.Domain.Data
{
    public class DocumentAssetGroupMap : IEntityTypeConfiguration<DocumentAssetGroup>
    {
        public void Configure(EntityTypeBuilder<DocumentAssetGroup> builder)
        {
            builder.ToTable(nameof(DocumentAssetGroup), DbConstants.CofoundrySchema);

            builder.Property(s => s.GroupName)
                .IsRequired()
                .HasMaxLength(64);

            builder.HasOne(s => s.ParentDocumentAssetGroup)
                .WithMany(s => s.ChildDocumentAssetGroups)
                .HasForeignKey(d => d.ParentDocumentAssetGroupId);

            CreateAuditableMappingHelper.Map(builder);
        }
    }
}